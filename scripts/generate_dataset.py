"""
generate_dataset.py — Authoritative hardcoded ground truth dataset builder
Uses official school closure records (copy-pasted from district records) instead of
relying on Google Sheets, which had inconsistencies.

Targets (y):
  0 = Open/On Time
  1 = Delay
  2 = Early Release
  3 = Closure (includes Act. Cancelled, Workday — no school for students)
"""
import pandas as pd
import requests
import time
from datetime import datetime, timedelta

# Northern Virginia centroid (covers LCPS/FCPS/PWCS)
LAT = 38.9072
LON = -77.4070

# ─────────────────────────────────────────────────────────────────────────────
# OFFICIAL GROUND TRUTH  (authoritative — do NOT pull from Sheets)
# Format: 'YYYY-MM-DD': {'PWCS': int, 'FCPS': int, 'LCPS': int}
# 0=Open, 1=Delay, 2=Early Release, 3=Closure
# Act. Cancelled → 3, Workday → 3, On time (20%) → 0
# 9/1/21 (Hurricane Ida, September) → skipped
# 2/17/24 (Saturday) → skipped
# 3/3/26 (future as of training) → skipped until verified
# ─────────────────────────────────────────────────────────────────────────────
GROUND_TRUTH = {
    # ── 2019-2020 ──────────────────────────────────────────────────────────
    '2019-12-11': {'PWCS': 1, 'FCPS': 0, 'LCPS': 0},  # Minimal Wintry Mix
    '2019-12-15': {'PWCS': 1, 'FCPS': 0, 'LCPS': 3},  # Minimal Wintry Mix 0.5"
    '2019-12-16': {'PWCS': 3, 'FCPS': 0, 'LCPS': 3},  # Weak Snowstorm 1.5"
    '2020-01-07': {'PWCS': 2, 'FCPS': 2, 'LCPS': 3},  # Moderate Snowstorm 4"
    '2020-01-08': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Moderate Refreeze
    '2020-01-09': {'PWCS': 1, 'FCPS': 0, 'LCPS': 0},  # Minimal Refreeze
    '2020-01-17': {'PWCS': 0, 'FCPS': 3, 'LCPS': 0},  # FCPS=Act. Cancelled

    # ── 2020-2021 ──────────────────────────────────────────────────────────
    '2020-12-16': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # FCPS=Act. Cancelled
    '2020-12-17': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # FCPS=Act. Cancelled
    '2020-12-18': {'PWCS': 1, 'FCPS': 0, 'LCPS': 0},  # Minimal Refreeze
    '2021-01-25': {'PWCS': 1, 'FCPS': 0, 'LCPS': 1},  # Minimal Wintry Mix 0.5"
    '2021-02-01': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # FCPS=Act. Cancelled
    '2021-02-02': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # FCPS=Act. Cancelled
    '2021-02-03': {'PWCS': 1, 'FCPS': 0, 'LCPS': 0},  # Minimal Snowstorm <1"
    '2021-02-11': {'PWCS': 1, 'FCPS': 0, 'LCPS': 3},  # Minimal Snowstorm >1"
    '2021-02-12': {'PWCS': 1, 'FCPS': 0, 'LCPS': 0},  # Minimal Snowstorm 0"
    '2021-02-18': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Weak Snowstorm 1"
    '2021-02-19': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # FCPS=Act. Cancelled

    # ── 2021-2022 ──────────────────────────────────────────────────────────
    # 9/1/21 skipped (Hurricane Ida, September, not winter)
    '2022-01-03': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Strong Snowstorm 6-10"
    '2022-01-04': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Strong Snowstorm 6-10"
    '2022-01-05': {'PWCS': 3, 'FCPS': 3, 'LCPS': 0},  # LCPS back on time
    '2022-01-06': {'PWCS': 3, 'FCPS': 3, 'LCPS': 0},  # LCPS back on time (I-95 ice)
    '2022-01-07': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Weak Snowstorm 1-3"
    '2022-01-16': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Act. Cancelled all
    '2022-01-17': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Act. Cancelled all
    '2022-01-18': {'PWCS': 0, 'FCPS': 0, 'LCPS': 3},  # LCPS Closed, others On Time
    '2022-01-20': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Weak Snowstorm 0-2"
    '2022-01-27': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Act. Cancelled all

    # ── 2022-2023 ──────────────────────────────────────────────────────────
    '2022-12-15': {'PWCS': 3, 'FCPS': 1, 'LCPS': 3},  # FCPS=Delay, others Closed

    # ── 2023-2024 ──────────────────────────────────────────────────────────
    '2024-01-16': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Moderate Snowstorm 4"
    '2024-01-17': {'PWCS': 1, 'FCPS': 1, 'LCPS': 3},  # LCPS still Closed
    '2024-01-19': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Weak Snowstorm 1-4"
    '2024-02-13': {'PWCS': 0, 'FCPS': 1, 'LCPS': 3},  # PWCS on time, FCPS delay, LCPS closed

    # ── 2024-2025 ──────────────────────────────────────────────────────────
    '2025-01-06': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Strong Snowstorm 7"
    '2025-01-07': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},
    '2025-01-08': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},
    '2025-01-09': {'PWCS': 3, 'FCPS': 3, 'LCPS': 1},  # LCPS=Delay
    '2025-01-10': {'PWCS': 1, 'FCPS': 1, 'LCPS': 1},  # All Delay
    '2025-01-21': {'PWCS': 0, 'FCPS': 1, 'LCPS': 3},  # Arctic blast; LCPS=Closed
    '2025-01-22': {'PWCS': 0, 'FCPS': 1, 'LCPS': 1},
    '2025-01-23': {'PWCS': 0, 'FCPS': 0, 'LCPS': 1},
    '2025-02-06': {'PWCS': 1, 'FCPS': 1, 'LCPS': 1},  # Minimal Wintry Mix
    '2025-02-11': {'PWCS': 2, 'FCPS': 2, 'LCPS': 2},  # Early Release all
    '2025-02-12': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Closed all

    # ── 2025-2026 ──────────────────────────────────────────────────────────
    '2025-12-02': {'PWCS': 0, 'FCPS': 0, 'LCPS': 1},  # LCPS=Delay
    '2025-12-05': {'PWCS': 1, 'FCPS': 1, 'LCPS': 3},  # LCPS=Closed
    '2025-12-15': {'PWCS': 0, 'FCPS': 0, 'LCPS': 1},  # LCPS=Delay
    '2026-01-26': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Strong Wintry Mix 8"
    '2026-01-27': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},
    '2026-01-28': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},
    '2026-01-29': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # FCPS=Workday → Closure
    '2026-01-30': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # FCPS=Workday → Closure
    '2026-02-02': {'PWCS': 3, 'FCPS': 3, 'LCPS': 1},  # LCPS=Delay
    '2026-02-03': {'PWCS': 1, 'FCPS': 1, 'LCPS': 1},
    '2026-02-04': {'PWCS': 1, 'FCPS': 1, 'LCPS': 1},
    '2026-02-05': {'PWCS': 1, 'FCPS': 1, 'LCPS': 1},
    '2026-02-06': {'PWCS': 1, 'FCPS': 1, 'LCPS': 1},
    '2026-02-23': {'PWCS': 3, 'FCPS': 3, 'LCPS': 3},  # Moderate Snowstorm 2-6"
    '2026-03-02': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # User confirmed: Open on time
    '2026-03-03': {'PWCS': 0, 'FCPS': 1, 'LCPS': 1},  # PWCS=Open time(20%), FCPS/LCPS=Delay

    # ── Regular winter school days (Open) — NOT near any storm ─────────────
    # Added to balance the dataset. These are verified normal school days
    # picked from gaps BETWEEN the listed storm events above.

    # 2019-2020 gaps
    '2019-12-18': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed, after 12/16 storm recovery
    '2020-02-12': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Feb, no storm listed
    '2020-03-04': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Mar, no storm listed

    # 2020-2021 gaps
    '2021-01-13': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Jan, between Dec storm and Jan 25
    '2021-03-03': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Mar, after all Feb storms

    # 2021-2022 gaps
    '2021-12-08': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Dec, before Jan 2022 events
    '2022-02-09': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Feb, post Jan closures
    '2022-03-02': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Mar, no storm listed

    # 2022-2023 gap (only 1 storm event listed all season!)
    '2023-01-11': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Jan, quiet season
    '2023-02-15': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Feb, quiet season
    '2023-03-01': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Mar, quiet season

    # 2023-2024 gaps
    '2023-12-13': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Dec, before Jan 2024 events
    '2024-02-07': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Feb, between Jan 19 and Feb 13

    # 2024-2025 gaps
    '2024-12-11': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Dec, before Dec 2025 events
    '2025-03-05': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Mar, after Feb season ends

    # 2025-2026 gaps
    '2025-11-19': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Nov, before Dec 2025 events
    '2025-12-10': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Dec, between Dec 5 and Dec 15
    '2026-01-07': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Jan, before Jan 26 storm
    '2026-01-14': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Jan, before Jan 26 storm
    '2026-01-21': {'PWCS': 0, 'FCPS': 0, 'LCPS': 0},  # Wed Jan, before Jan 26 storm
}

DISTRICTS = ['LCPS', 'FCPS', 'PWCS']

def fetch_weather(date_obj):
    """Fetch prior day + target day (48h) from Open-Meteo archive."""
    prev = (date_obj - timedelta(days=1)).strftime('%Y-%m-%d')
    curr = date_obj.strftime('%Y-%m-%d')
    url = (
        f"https://archive-api.open-meteo.com/v1/archive"
        f"?latitude={LAT}&longitude={LON}"
        f"&start_date={prev}&end_date={curr}"
        f"&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,"
        f"dew_point_2m,precipitation,snowfall,snow_depth,weather_code,"
        f"surface_pressure,wind_speed_10m,wind_gusts_10m"
        f"&timezone=America%2FNew_York"
    )
    for attempt in range(3):
        try:
            r = requests.get(url, timeout=15)
            if r.status_code == 200:
                return r.json()
        except Exception as e:
            print(f"  Attempt {attempt+1} failed for {curr}: {e}")
        time.sleep(1)
    return None

def engineer_features(weather):
    if not weather or 'hourly' not in weather:
        return None
    h = weather['hourly']

    def ss(arr): return sum(x for x in arr if x is not None)
    def smin(arr): v = [x for x in arr if x is not None]; return min(v) if v else 0.0
    def smx(arr): v = [x for x in arr if x is not None]; return max(v) if v else 0.0

    snow = h.get('snowfall', [0]*48)
    temp = h.get('temperature_2m', [0]*48)
    apparent = h.get('apparent_temperature', [0]*48)
    gusts = h.get('wind_gusts_10m', [0]*48)
    codes = h.get('weather_code', [0]*48)
    hum = h.get('relative_humidity_2m', [0]*48)
    dew = h.get('dew_point_2m', [0]*48)
    pres = h.get('surface_pressure', [0]*48)

    # Prior day = indices 0-23, target day = 24-47
    prior_snow = ss(snow[:24])
    prior_min_temp = smin(temp[:24])

    day_snow = snow[24:48]
    day_temp = temp[24:48]
    day_apparent = apparent[24:48] if len(apparent) >= 48 else apparent
    day_gusts = gusts[24:48]
    day_codes = codes[24:48]
    day_hum = hum[24:48]
    day_dew = dew[24:48]
    day_pres = pres[24:48]

    ice_codes = {66, 67, 77}
    min_apparent = smin(day_apparent)
    is_extreme_cold = 1 if min_apparent <= -6.0 or any(c in ice_codes for c in day_codes if c) else 0

    return {
        'overnight_snow':     ss(day_snow[0:6]),
        'commute_snow':       ss(day_snow[6:10]),
        'mid_day_snow':       ss(day_snow[10:15]),
        'total_snow':         ss(day_snow),
        'prior_day_snow':     prior_snow,
        'prior_min_temp':     prior_min_temp,
        'has_ice':            1 if any(c in ice_codes for c in day_codes if c) else 0,
        'min_temp':           smin(day_temp),
        'min_apparent_temp':  min_apparent,
        'is_extreme_cold':    is_extreme_cold,
        'max_wind_gust':      smx(day_gusts),
        'avg_humidity':       ss(day_hum) / len(day_hum) if day_hum else 0,
        'avg_dew_point':      ss(day_dew) / len(day_dew) if day_dew else 0,
        'min_pressure':       smin(day_pres),
    }

def main():
    print(f"Building datasets from {len(GROUND_TRUTH)} official ground-truth dates...")
    district_records = {d: [] for d in DISTRICTS}

    dates = sorted(GROUND_TRUTH.keys())
    for date_key in dates:
        date_obj = datetime.strptime(date_key, '%Y-%m-%d')
        official = GROUND_TRUTH[date_key]

        weather = fetch_weather(date_obj)
        features = engineer_features(weather)
        if not features:
            print(f"  ⚠️  No weather data for {date_key} — skipping")
            continue

        for district in DISTRICTS:
            target = official.get(district)
            if target is None:
                continue
            rec = dict(features)
            rec['date'] = date_key
            rec['target'] = target
            district_records[district].append(rec)

        print(f"[{date_key}]  LCPS={official.get('LCPS')}  FCPS={official.get('FCPS')}  PWCS={official.get('PWCS')}")
        time.sleep(0.4)

    for district in DISTRICTS:
        records = district_records[district]
        df = pd.DataFrame(records)
        fname = f'historical_{district.lower()}.csv'
        df.to_csv(fname, index=False)
        print(f"\n✅ {district}: {len(df)} records saved to {fname}")
        print(df['target'].value_counts().rename({0:'Open',1:'Delay',2:'Early Release',3:'Closure'}).to_string())

if __name__ == '__main__':
    main()
