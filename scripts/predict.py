"""
predict.py — Multi-district Snow Day ML Predictor
Runs all 3 district models (LCPS, FCPS, PWCS) and saves per-district forecasts to forecast.json
"""
import pandas as pd
import numpy as np
import requests
import joblib
import json
from datetime import datetime, timedelta
import os

# Northern VA coordinates (centroid of all 3 districts)
LAT = 38.9072
LON = -77.4070

LABEL_MAP = {0: "Open", 1: "Delay", 2: "Early Release", 3: "Closure"}

DISTRICTS = ['LCPS', 'FCPS', 'PWCS']

def fetch_forecast(days=4):
    """Fetch days+1 so we always have a 'prior day' for day 0."""
    url = (f"https://api.open-meteo.com/v1/forecast"
           f"?latitude={LAT}&longitude={LON}"
           f"&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,"
           f"dew_point_2m,precipitation,snowfall,snow_depth,weather_code,"
           f"surface_pressure,wind_speed_10m,wind_gusts_10m,soil_temperature_0cm"
           f"&timezone=America%2FNew_York"
           f"&forecast_days={days}")
    res = requests.get(url, timeout=10)
    if res.status_code == 200:
        return res.json()
    return None

def engineer_features(hourly, prior_start, current_start):
    """
    prior_start: index of 00:00 of the prior day (24 values)
    current_start: index of 00:00 of the target day (24 values)
    """
    def ss(arr): return sum(x for x in arr if x is not None)
    def smin(arr): v = [x for x in arr if x is not None]; return min(v) if v else 0
    def smx(arr): v = [x for x in arr if x is not None]; return max(v) if v else 0

    prior_snow = hourly.get('snowfall', [])[prior_start:prior_start+24]
    prior_temp = hourly.get('temperature_2m', [])[prior_start:prior_start+24]

    snow = hourly.get('snowfall', [])[current_start:current_start+24]
    temp = hourly.get('temperature_2m', [])[current_start:current_start+24]
    apparent = hourly.get('apparent_temperature', [])[current_start:current_start+24]
    gusts = hourly.get('wind_gusts_10m', [])[current_start:current_start+24]
    codes = hourly.get('weather_code', [])[current_start:current_start+24]
    hum = hourly.get('relative_humidity_2m', [])[current_start:current_start+24]
    dew = hourly.get('dew_point_2m', [])[current_start:current_start+24]
    pres = hourly.get('surface_pressure', [])[current_start:current_start+24]

    ice_codes = {66, 67, 77}
    min_apparent = smin(apparent) if apparent else smin(temp)
    is_extreme_cold = 1 if min_apparent <= -6.0 or any(c in ice_codes for c in codes if c) else 0

    return {
        'overnight_snow':      ss(snow[0:6]),
        'commute_snow':        ss(snow[6:10]),
        'mid_day_snow':        ss(snow[10:15]),
        'total_snow':          ss(snow),
        'has_ice':             1 if any(c in ice_codes for c in codes if c) else 0,
        'min_temp':            smin(temp),
        'min_apparent_temp':   min_apparent,
        'is_extreme_cold':     is_extreme_cold,
        'pre_dawn_wind':       smx(gusts[0:7]),
        'prior_day_snow':      ss(prior_snow),
        'prior_day_min_temp':  smin(prior_temp),
        'max_wind_gust':       smx(gusts),
        'avg_humidity':        ss(hum) / len(hum) if hum else 0,
        'avg_dew_point':       ss(dew) / len(dew) if dew else 0,
        'min_pressure':        smin(pres),
    }

def predict_district(district, hourly, base_date, days=3):
    pkl = f'xgboost_{district.lower()}_model.pkl'
    try:
        pipeline = joblib.load(pkl)
    except FileNotFoundError:
        print(f"[{district}] Model not found: {pkl}")
        return []

    scaler = pipeline['scaler']
    model = pipeline['model']
    feature_cols = pipeline['features']

    results = []
    for day_idx in range(days):
        target_date = base_date + timedelta(days=day_idx)
        # Day 0 in the forecast API = today, but we need index = day_idx * 24
        # Prior day = (day_idx - 1) * 24, but for day 0 we use the last 24 hours from index 0
        # We fetched days+1 so index 0 is yesterday's data
        prior_start = day_idx * 24          # yesterday offset within the extended fetch
        current_start = (day_idx + 1) * 24  # today's data starts 24h after

        features = engineer_features(hourly, prior_start, current_start)
        X = pd.DataFrame([features], columns=feature_cols)
        X_scaled = scaler.transform(X)
        probs = model.predict_proba(X_scaled)[0]
        pred = LABEL_MAP[int(np.argmax(probs))]

        results.append({
            "date": target_date.strftime('%Y-%m-%d'),
            "label": target_date.strftime('%A, %b %d'),
            "primary_prediction": pred,
            "probabilities": {
                "open":          round(float(probs[0]) * 100, 1),
                "delay":         round(float(probs[1]) * 100, 1),
                "early_release": round(float(probs[2]) * 100, 1),
                "closure":       round(float(probs[3]) * 100, 1),
            }
        })
    return results

def main():
    print("Fetching 4-day forecast (3 days + 1 prior day)...")
    data = fetch_forecast(days=4)
    if not data or 'hourly' not in data:
        print("Failed to fetch forecast.")
        return

    hourly = data['hourly']
    base_date = datetime.now()

    output = {
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "districts": {}
    }

    for district in DISTRICTS:
        forecasts = predict_district(district, hourly, base_date, days=3)
        output["districts"][district] = {"forecasts": forecasts}
        print(f"[{district}] Tomorrow: {forecasts[1]['primary_prediction'] if len(forecasts) > 1 else 'N/A'}")

    # Also keep backward-compatible flat structure (LCPS is the default)
    output["forecasts"] = output["districts"].get("LCPS", {}).get("forecasts", [])

    out_path = os.path.join("public", "data", "forecast.json")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, 'w') as f:
        json.dump(output, f, indent=4)

    print(f"Predictions saved to {out_path}")

if __name__ == "__main__":
    main()
