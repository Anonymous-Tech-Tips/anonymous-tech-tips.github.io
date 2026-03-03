"""
train_all_districts.py — Train one XGBoost model per district
Targets ~90-95% accuracy on historical data (100% = overfitting).
Produces: xgboost_lcps_model.pkl, xgboost_fcps_model.pkl, xgboost_pwcs_model.pkl
"""
import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
from sklearn.utils.class_weight import compute_sample_weight
import joblib

# Streamlined feature set — enough signal, not too many for ~58 samples
FEATURE_COLS = [
    'overnight_snow', 'commute_snow', 'mid_day_snow', 'total_snow',
    'prior_day_snow', 'prior_min_temp',
    'has_ice', 'min_temp', 'min_apparent_temp', 'is_extreme_cold',
    'max_wind_gust', 'avg_humidity', 'avg_dew_point', 'min_pressure'
]

DISTRICTS = ['LCPS', 'FCPS', 'PWCS']
LABEL_NAMES = ['Open', 'Delay', 'Early Release', 'Closure']

def train_district(district: str) -> dict:
    csv = f'historical_{district.lower()}.csv'
    try:
        df = pd.read_csv(csv)
    except FileNotFoundError:
        print(f"[{district}] ❌ {csv} not found — run generate_dataset.py first")
        return {}

    # Only use feature columns that exist in this CSV
    feat = [c for c in FEATURE_COLS if c in df.columns]
    X = df[feat]
    y = df['target']

    n = len(df)
    print(f"\n{'='*55}")
    print(f"  {district}  ({n} records, {len(feat)} features)")
    dist = dict(y.value_counts().sort_index())
    labels = {0:'Open', 1:'Delay', 2:'ER', 3:'Closure'}
    print(f"  Classes: { {labels[k]: v for k,v in dist.items()} }")
    print(f"{'='*55}")

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Balanced class weights — no aggressive manual boosting to avoid overfitting
    sample_weights = compute_sample_weight('balanced', y)

    # Hyperparameters chosen for generalization, NOT memorization:
    #   max_depth=3: shallow trees don't memorize individual storms
    #   min_child_weight=2: requires ≥2 samples per leaf (avoids single-sample splits)
    #   gamma=0.3: only split if it genuinely reduces loss significantly
    #   n_estimators=100: enough trees to learn patterns, few enough to avoid overfit
    model = xgb.XGBClassifier(
        objective='multi:softprob',
        num_class=4,
        eval_metric='mlogloss',
        n_estimators=100,
        max_depth=3,
        learning_rate=0.08,
        subsample=0.8,
        colsample_bytree=0.7,
        gamma=0.3,
        min_child_weight=2,
        reg_alpha=0.1,   # L1 regularization
        reg_lambda=1.5,  # L2 regularization
        random_state=42,
        use_label_encoder=False
    )

    model.fit(X_scaled, y, sample_weight=sample_weights)

    preds = model.predict(X_scaled)
    acc = accuracy_score(y, preds)

    # Accuracy note: ~90-96% on historical data is ideal — higher likely = overfit
    acc_note = "(✅ good generalization)" if 0.88 <= acc <= 0.97 else \
               ("(⚠️  possible overfit)" if acc > 0.97 else "(⚠️  underfitting)")

    print(f"\n  Historical Accuracy: {acc*100:.2f}% {acc_note}")
    print(f"\n  Classification Report:")
    print(classification_report(y, preds, target_names=LABEL_NAMES, zero_division=0))

    mismatches = [(df.iloc[i]['date'], int(y.iloc[i]), int(preds[i]))
                  for i in range(len(y)) if y.iloc[i] != preds[i]]
    if mismatches:
        print(f"  Misclassified ({len(mismatches)}):")
        for date, actual, predicted in mismatches:
            print(f"    {date}: Actual={LABEL_NAMES[actual]:12} Predicted={LABEL_NAMES[predicted]}")
    else:
        print(f"  ⚠️  Perfect training accuracy — check for overfitting on new storms!")

    pipeline = {
        'scaler': scaler,
        'model': model,
        'features': feat,
        'district': district
    }
    out_path = f'xgboost_{district.lower()}_model.pkl'
    joblib.dump(pipeline, out_path)
    print(f"  Saved → {out_path}")

    return {'district': district, 'accuracy': acc, 'n_samples': n, 'n_features': len(feat)}

def main():
    results = []
    for d in DISTRICTS:
        r = train_district(d)
        if r:
            results.append(r)

    print(f"\n\n{'='*55}")
    print("  FINAL SUMMARY")
    print(f"{'='*55}")
    for r in results:
        acc = r['accuracy']
        status = "✅ good" if 0.88 <= acc <= 0.97 else ("⚠️  overfit?" if acc > 0.97 else "⚠️  underfit")
        print(f"  {r['district']}: {acc*100:.2f}% ({r['n_samples']} storms, {r['n_features']} features) — {status}")
    print()
    print("  Accuracy note: ~90-96% is ideal for a 58-sample dataset.")
    print("  100% = model memorized noise; will fail on unseen storms.")

if __name__ == '__main__':
    main()
