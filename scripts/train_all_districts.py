"""
Train one XGBoost multi:softprob model per district.
Produces: xgboost_lcps_model.pkl, xgboost_fcps_model.pkl, xgboost_pwcs_model.pkl
"""
import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
from sklearn.utils.class_weight import compute_sample_weight
import joblib

FEATURE_COLS = [
    'overnight_snow', 'commute_snow', 'mid_day_snow', 'total_snow',
    'has_ice', 'min_temp', 'min_apparent_temp', 'is_extreme_cold',
    'pre_dawn_wind', 'prior_day_snow', 'prior_day_min_temp',
    'max_wind_gust', 'avg_humidity', 'avg_dew_point', 'min_pressure'
]

DISTRICTS = ['LCPS', 'FCPS', 'PWCS']

def train_district(district: str) -> dict:
    csv = f'historical_{district.lower()}.csv'
    try:
        df = pd.read_csv(csv)
    except FileNotFoundError:
        print(f"[{district}] ❌ {csv} not found — run generate_dataset.py first")
        return {}

    X = df[FEATURE_COLS]
    y = df['target']

    print(f"\n{'='*50}")
    print(f"Training {district} model ({len(df)} records)")
    print(f"Class distribution: {dict(y.value_counts().sort_index())}")
    print(f"{'='*50}")

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Base balanced weights
    sample_weights = compute_sample_weight('balanced', y)
    
    # Boost closures that happened on extreme cold days (Arctic blast / black ice events)
    # These are rare and hard to distinguish from delays without extra emphasis
    if 'is_extreme_cold' in X.columns:
        cold_closure_mask = (df['is_extreme_cold'] == 1) & (y == 3)
        sample_weights[cold_closure_mask] *= 5.0
        n_boosted = cold_closure_mask.sum()
        if n_boosted > 0:
            print(f"  Boosted {n_boosted} extreme-cold closure samples by 5x")

    model = xgb.XGBClassifier(
        objective='multi:softprob',
        num_class=4,
        eval_metric='mlogloss',
        n_estimators=120,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.9,
        colsample_bytree=0.9,
        gamma=0.05,
        min_child_weight=1,
        random_state=42,
        use_label_encoder=False
    )

    model.fit(X_scaled, y, sample_weight=sample_weights)

    preds = model.predict(X_scaled)
    acc = accuracy_score(y, preds)
    print(f"\n{district} Historical Accuracy: {acc*100:.2f}%")
    print(classification_report(y, preds,
                                 target_names=['Open', 'Delay', 'Early Release', 'Closure'],
                                 zero_division=0))

    # Print mismatches to understand edge cases
    mismatches = df[preds != y.values]
    if not mismatches.empty:
        print(f"  ⚠️  {len(mismatches)} misclassified records:")
        for _, row in mismatches.iterrows():
            actual = y[row.name]
            predicted = preds[row.name]
            print(f"    {row['date']}: Actual={actual}, Predicted={predicted} — snow={row['total_snow']:.2f}in, temp={row['min_temp']:.1f}°C")
    else:
        print(f"  ✅ 100% accuracy on full historical dataset!")

    pipeline = {
        'scaler': scaler,
        'model': model,
        'features': FEATURE_COLS,
        'district': district
    }

    out_path = f'xgboost_{district.lower()}_model.pkl'
    joblib.dump(pipeline, out_path)
    print(f"\nSaved pipeline to {out_path}")

    return {'district': district, 'accuracy': acc, 'n_samples': len(df)}

def main():
    results = []
    for d in DISTRICTS:
        r = train_district(d)
        if r:
            results.append(r)

    print(f"\n\n{'='*50}")
    print("SUMMARY")
    print(f"{'='*50}")
    for r in results:
        status = "✅" if r['accuracy'] == 1.0 else "⚠️ "
        print(f"  {status} {r['district']}: {r['accuracy']*100:.2f}% on {r['n_samples']} records")

if __name__ == "__main__":
    main()
