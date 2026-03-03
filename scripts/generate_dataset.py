import pandas as pd
import requests
import time
from datetime import datetime

# Northern VA Coordinates (centroid between LCPS/FCPS/PWCS)
LAT = 38.9072
LON = -77.4070

# District column indices in the Google Sheet (0-indexed, header=None)
# Row format: Region | Day | Date | PWCS | FCPS | LCPS | ...
DISTRICTS = {
    'LCPS': 5,
    'FCPS': 4,
    'PWCS': 3,
}

def parse_date(date_str):
    parts = str(date_str).strip().split('/')
    m = int(parts[0])
    d = int(parts[1])
    y = int(parts[2])
    if y < 100:
        y += 2000
    return datetime(y, m, d)

def map_status(status_str):
    if not status_str or pd.isna(status_str):
        return None  # None = skip this row for this district
    s = str(status_str).lower().strip()
    if not s or s == 'nan':
        return None
    if 'early release' in s or 'early dismissal' in s:
        return 2
    if 'closed' in s or 'closure' in s:
        return 3
    if 'delay' in s:
        return 1
    if 'on time' in s or 'open' in s or 'normal' in s:
        return 0
    return None  # skip ambiguous entries

def fetch_weather(date_obj):
    from datetime import timedelta
    prev_date = (date_obj - timedelta(days=1)).strftime('%Y-%m-%d')
    start_date = date_obj.strftime('%Y-%m-%d')
    # Fetch 2 days: prior day + current day
    url = (f"https://archive-api.open-meteo.com/v1/archive"
           f"?latitude={LAT}&longitude={LON}"
           f"&start_date={prev_date}&end_date={start_date}"
           f"&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,dew_point_2m,"
           f"precipitation,snowfall,snow_depth,weather_code,surface_pressure,"
           f"wind_speed_10m,wind_gusts_10m,soil_temperature_0cm"
           f"&timezone=America%2FNew_York")
    for _ in range(3):
        try:
            res = requests.get(url, timeout=12)
            if res.status_code == 200:
                return res.json()
        except Exception as e:
            print(f"  Retrying {start_date}: {e}")
        time.sleep(1)
    return None

def engineer_features(weather_data):
    if not weather_data or 'hourly' not in weather_data:
        return None
    h = weather_data['hourly']

    def ssum(arr): return sum(x for x in arr if x is not None)
    def smin(arr): v = [x for x in arr if x is not None]; return min(v) if v else 0
    def smax(arr): v = [x for x in arr if x is not None]; return max(v) if v else 0

    # Split: first 24 hours = prior day, last 24 = decision day
    snow = h.get('snowfall', [0]*48)
    temp = h.get('temperature_2m', [0]*48)
    apparent = h.get('apparent_temperature', [0]*48)
    gusts = h.get('wind_gusts_10m', [0]*48)
    codes = h.get('weather_code', [0]*48)
    hum = h.get('relative_humidity_2m', [0]*48)
    dew = h.get('dew_point_2m', [0]*48)
    pres = h.get('surface_pressure', [0]*48)

    # Prior day (indices 0-23)
    prior_snow = snow[:24]
    prior_temp = temp[:24]
    # Current decision day (indices 24-47)
    day_snow = snow[24:48]
    day_temp = temp[24:48]
    day_apparent = apparent[24:48] if apparent else day_temp
    day_gusts = gusts[24:48]
    day_codes = codes[24:48]
    day_hum = hum[24:48]
    day_dew = dew[24:48]
    day_pres = pres[24:48]

    ice_codes = {66, 67, 77}
    min_apparent = smin(day_apparent) if day_apparent else smin(day_temp)
    # Extreme cold: feels like <= -6°C (21°F) or freezing rain present
    is_extreme_cold = 1 if min_apparent <= -6.0 or any(c in ice_codes for c in day_codes if c) else 0
    pre_dawn_wind = smax(day_gusts[0:7])  # max wind gust midnight to 7 AM
    return {
        'overnight_snow':  ssum(day_snow[0:6]),
        'commute_snow':    ssum(day_snow[6:10]),
        'mid_day_snow':    ssum(day_snow[10:15]),
        'total_snow':      ssum(day_snow),
        'has_ice':         1 if any(c in ice_codes for c in day_codes if c) else 0,
        'min_temp':        smin(day_temp),
        'min_apparent_temp': min_apparent,
        'is_extreme_cold': is_extreme_cold,
        'pre_dawn_wind':   pre_dawn_wind,
        'prior_day_snow':  ssum(prior_snow),
        'prior_day_min_temp': smin(prior_temp),
        'max_wind_gust':   smax(day_gusts),
        'avg_humidity':    ssum(day_hum) / len(day_hum) if day_hum else 0,
        'avg_dew_point':   ssum(day_dew) / len(day_dew) if day_dew else 0,
        'min_pressure':    smin(day_pres),
    }

def main():
    print("Loading Google Sheets...")
    urls = [
        "https://docs.google.com/spreadsheets/d/1VULC1vySGCZNfaU6XuQ4-u5IEsL-s0s2wzWM6TgPZPs/export?format=csv&gid=702572873",
        "https://docs.google.com/spreadsheets/d/1VULC1vySGCZNfaU6XuQ4-u5IEsL-s0s2wzWM6TgPZPs/export?format=csv&gid=0",
    ]
    frames = []
    for url in urls:
        try:
            frames.append(pd.read_csv(url, header=None))
        except Exception as e:
            print(f"Failed to load {url}: {e}")
    if not frames:
        print("No data loaded.")
        return

    df = pd.concat(frames, ignore_index=True)
    
    # district_name -> list of feature dicts
    district_records = {d: [] for d in DISTRICTS}
    seen_dates = set()
    weather_cache = {}

    for _, row in df.iterrows():
        date_str = str(row.get(2, ''))
        if '/' not in date_str:
            continue
        try:
            date_obj = parse_date(date_str)
        except Exception:
            continue
        if date_obj.year < 2015 or date_obj.weekday() >= 5:
            continue

        date_key = date_obj.strftime('%Y-%m-%d')
        if date_key in seen_dates:
            continue
        seen_dates.add(date_key)

        # Fetch weather once per date (shared across districts)
        if date_key not in weather_cache:
            weather = fetch_weather(date_obj)
            weather_cache[date_key] = weather
            time.sleep(0.4)
        else:
            weather = weather_cache[date_key]

        features = engineer_features(weather)
        if not features:
            continue

        for district, col_idx in DISTRICTS.items():
            status_val = row.get(col_idx, None)
            target = map_status(status_val)
            if target is None:
                continue
            rec = dict(features)
            rec['date'] = date_key
            rec['target'] = target
            district_records[district].append(rec)

        print(f"[{date_key}] LCPS={map_status(row.get(5))} FCPS={map_status(row.get(4))} PWCS={map_status(row.get(3))}")

    for district, records in district_records.items():
        out_df = pd.DataFrame(records)
        fname = f'historical_{district.lower()}.csv'
        out_df.to_csv(fname, index=False)
        print(f"\nSaved {len(records)} records to {fname}")
        print(out_df['target'].value_counts().to_string())

if __name__ == "__main__":
    main()
