import pandas as pd
import requests
import time
from datetime import datetime

# Loudoun County Coordinates
LAT = 39.1156
LON = -77.5636

def parse_date(date_str, year):
    # Some dates are m/d/y, some m/d/yy, some are m/d
    parts = str(date_str).strip().split('/')
    m = int(parts[0])
    d = int(parts[1])
    if len(parts) == 3:
        y = int(parts[2])
        if y < 100:
            y += 2000
    else:
        y = int(year)
    return datetime(y, m, d)

def map_status(status_str):
    if pd.isna(status_str):
        return 0
    s = str(status_str).lower()
    if 'early release' in s:
        return 2
    if 'closed' in s:
        return 3
    if 'delay' in s:
        return 1
    return 0

def fetch_weather(date_obj):
    # Fetch 3 days: day before, day of, day after
    start_date = date_obj.strftime('%Y-%m-%d')
    end_date = date_obj.strftime('%Y-%m-%d')
    
    url = f"https://archive-api.open-meteo.com/v1/archive?latitude={LAT}&longitude={LON}&start_date={start_date}&end_date={end_date}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,wind_speed_10m,wind_gusts_10m,soil_temperature_0cm&timezone=America%2FNew_York"
    
    retries = 3
    for _ in range(retries):
        try:
            res = requests.get(url, timeout=10)
            if res.status_code == 200:
                return res.json()
        except Exception as e:
            print(f"Error fetching {start_date}: {e}")
        time.append(1)
    return None

def engineer_features(weather_data):
    if not weather_data or 'hourly' not in weather_data:
        return None
        
    hourly = weather_data['hourly']
    
    # Indices for local time (America/New_York)
    # The API returns 24 hours for the single day (00:00 to 23:00)
    
    def safe_sum(arr):
        return sum([x for x in arr if x is not None])
    def safe_min(arr):
        valid = [x for x in arr if x is not None]
        return min(valid) if valid else 0
    def safe_max(arr):
        valid = [x for x in arr if x is not None]
        return max(valid) if valid else 0

    snowfall = hourly.get('snowfall', [0]*24)
    temp = hourly.get('temperature_2m', [0]*24)
    wind_gust = hourly.get('wind_gusts_10m', [0]*24)
    weather_codes = hourly.get('weather_code', [0]*24)
    humidity = hourly.get('relative_humidity_2m', [0]*24)
    dew_point = hourly.get('dew_point_2m', [0]*24)
    pressure = hourly.get('surface_pressure', [0]*24)

    # Time-based engineering
    overnight_snow = safe_sum(snowfall[0:6]) # 12 AM - 5 AM
    commute_snow = safe_sum(snowfall[6:10]) # 6 AM - 9 AM
    mid_day_snow = safe_sum(snowfall[10:15]) # 10 AM - 2 PM
    total_snow = safe_sum(snowfall)
    
    # Ice logic
    ice_codes = {66, 67, 77} # Freezing rain, snow grains
    has_ice = 1 if any(code in ice_codes for code in weather_codes if code is not None) else 0
    
    min_temp = safe_min(temp)
    max_wind_gust = safe_max(wind_gust)
    avg_humidity = safe_sum(humidity) / len(humidity) if humidity else 0
    avg_dew_point = safe_sum(dew_point) / len(dew_point) if dew_point else 0
    min_pressure = safe_min(pressure)
    
    return {
        'overnight_snow': overnight_snow,
        'commute_snow': commute_snow,
        'mid_day_snow': mid_day_snow,
        'total_snow': total_snow,
        'has_ice': has_ice,
        'min_temp': min_temp,
        'max_wind_gust': max_wind_gust,
        'avg_humidity': avg_humidity,
        'avg_dew_point': avg_dew_point,
        'min_pressure': min_pressure
    }

def main():
    print("Loading Google Sheets...")
    url1 = "https://docs.google.com/spreadsheets/d/1VULC1vySGCZNfaU6XuQ4-u5IEsL-s0s2wzWM6TgPZPs/export?format=csv&gid=702572873"
    url2 = "https://docs.google.com/spreadsheets/d/1VULC1vySGCZNfaU6XuQ4-u5IEsL-s0s2wzWM6TgPZPs/export?format=csv&gid=0"
    
    # We must read manually as some columns might be inconsistent
    try:
        df1 = pd.read_csv(url1, header=None)
        df2 = pd.read_csv(url2, header=None)
    except Exception as e:
        print("Failed to load google sheets:", e)
        return
        
    df = pd.concat([df1, df2], ignore_index=True)
    records = []
    
    # We don't filter by 'Year' column directly because header=None
    print(f"Found {len(df)} historical records. Fetching weather...")
    
    for idx, row in df.iterrows():
        # Look for the date in column 2 (index 2)
        date_str = str(row[2]) if 2 in row else ""
        if not date_str or '/' not in date_str:
            continue
            
        try:
            # We don't have a reliable 'Year' column in all shapes, so use regex or split
            parts = date_str.split('/')
            if len(parts) == 3:
                date_obj = parse_date(date_str, 2020)
            else:
                continue
        except Exception:
            continue
            
        if date_obj.year < 2015:
            continue
            
        # Optional: skip weekends
        if date_obj.weekday() >= 5:
            continue
        
        # LCPS status is in column 5 (index 5)
        # 0: Region, 1: Day, 2: Date, 3: PWCS, 4: FCPS, 5: LCPS
        status_val = str(row[5]) if 5 in row else ""
        if pd.isna(status_val) or status_val.strip() == "":
            continue
            
        status = map_status(status_val)
        
        weather = fetch_weather(date_obj)
        features = engineer_features(weather)
        
        if features:
            features['date'] = date_obj.strftime('%Y-%m-%d')
            features['target'] = status
            records.append(features)
            
        time.sleep(0.5) # rate limit respecting
        print(f"Processed {date_obj.strftime('%Y-%m-%d')} - Target: {status}")

    out_df = pd.DataFrame(records)
    out_df.to_csv('historical_school_days.csv', index=False)
    print("Saved to historical_school_days.csv")

if __name__ == "__main__":
    main()
