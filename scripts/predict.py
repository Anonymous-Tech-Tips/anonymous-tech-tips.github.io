import pandas as pd
import numpy as np
import requests
import joblib
import json
from datetime import datetime, timedelta
import os

LAT = 39.1156
LON = -77.5636

def fetch_forecast(days=3):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,wind_speed_10m,wind_gusts_10m,soil_temperature_0cm&timezone=America%2FNew_York&forecast_days={days}"
    res = requests.get(url, timeout=10)
    if res.status_code == 200:
        return res.json()
    return None

def engineer_features(hourly_data, start_idx):
    def safe_sum(arr):
        return sum([x for x in arr if x is not None])
    def safe_max(arr):
        valid = [x for x in arr if x is not None]
        return max(valid) if valid else 0
    def safe_min(arr):
        valid = [x for x in arr if x is not None]
        return min(valid) if valid else 0

    end_idx = start_idx + 24
    
    snowfall = hourly_data.get('snowfall', [0]*(start_idx + 24))[start_idx:end_idx]
    temp = hourly_data.get('temperature_2m', [0]*(start_idx + 24))[start_idx:end_idx]
    wind_gust = hourly_data.get('wind_gusts_10m', [0]*(start_idx + 24))[start_idx:end_idx]
    weather_codes = hourly_data.get('weather_code', [0]*(start_idx + 24))[start_idx:end_idx]
    humidity = hourly_data.get('relative_humidity_2m', [0]*(start_idx + 24))[start_idx:end_idx]
    dew_point = hourly_data.get('dew_point_2m', [0]*(start_idx + 24))[start_idx:end_idx]
    pressure = hourly_data.get('surface_pressure', [0]*(start_idx + 24))[start_idx:end_idx]

    overnight_snow = safe_sum(snowfall[0:6])
    commute_snow = safe_sum(snowfall[6:10])
    mid_day_snow = safe_sum(snowfall[10:15])
    total_snow = safe_sum(snowfall)
    
    ice_codes = {66, 67, 77}
    has_ice = 1 if any(code in ice_codes for code in weather_codes if code is not None) else 0
    
    min_temp = safe_min(temp)
    max_wind_gust = safe_max(wind_gust)
    avg_humidity = safe_sum(humidity) / len(humidity) if humidity else 0
    avg_dew_point = safe_sum(dew_point) / len(dew_point) if dew_point else 0
    min_pressure = safe_min(pressure)
    
    return [
        overnight_snow, commute_snow, mid_day_snow, total_snow,
        has_ice, min_temp, max_wind_gust, avg_humidity, 
        avg_dew_point, min_pressure
    ]

def main():
    print("Fetching 3-day forecast...")
    data = fetch_forecast(3)
    if not data:
        print("Failed to fetch forecast.")
        return
        
    try:
        pipeline = joblib.load('xgboost_snow_model.pkl')
    except Exception as e:
        print("Failed to load ML pipeline. Train the model first.", e)
        return
        
    scaler = pipeline['scaler']
    model = pipeline['model']
    feature_cols = pipeline['features']
    
    predictions_out = []
    
    base_date = datetime.now()
    
    for day_idx in range(3):
        target_date = base_date + timedelta(days=day_idx)
        start_idx = day_idx * 24
        
        feature_vec = engineer_features(data['hourly'], start_idx)
        
        # Convert to dataframe
        X = pd.DataFrame([feature_vec], columns=feature_cols)
        
        # Scale
        X_scaled = scaler.transform(X)
        
        # Predict probs
        probs = model.predict_proba(X_scaled)[0]
        
        # Indices: [0: Open, 1: Delay, 2: Early Release, 3: Closure]
        mapping = {
            0: "Open",
            1: "Delay",
            2: "Early Release",
            3: "Closure"
        }
        
        pred_label_idx = np.argmax(probs)
        primary_pred = mapping[pred_label_idx]
        
        predictions_out.append({
            "date": target_date.strftime('%Y-%m-%d'),
            "label": target_date.strftime('%A, %b %d'),
            "primary_prediction": primary_pred,
            "probabilities": {
                "open": round(float(probs[0]) * 100, 1),
                "delay": round(float(probs[1]) * 100, 1),
                "early_release": round(float(probs[2]) * 100, 1),
                "closure": round(float(probs[3]) * 100, 1)
            }
        })
    
    output = {"forecasts": predictions_out, "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
    
    # Save to public directory for frontend access
    out_path = os.path.join("public", "data", "forecast.json")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    
    with open(out_path, 'w') as f:
        json.dump(output, f, indent=4)
        
    print(f"Predictions saved to {out_path}")

if __name__ == "__main__":
    main()
