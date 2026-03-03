import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import joblib

def main():
    print("Loading dataset...")
    try:
        df = pd.read_csv('historical_school_days.csv')
    except Exception as e:
        print("Failed to load historical_school_days.csv. Make sure to run generate_dataset.py first.")
        return
        
    if df.empty:
        print("Dataset is empty.")
        return
        
    feature_cols = [
        'overnight_snow', 'commute_snow', 'mid_day_snow', 'total_snow',
        'has_ice', 'min_temp', 'max_wind_gust', 'avg_humidity', 
        'avg_dew_point', 'min_pressure'
    ]
    
    X = df[feature_cols]
    y = df['target']
    
    print(f"Dataset shape: {X.shape}")
    
    print("Scaling features...")
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    from sklearn.utils.class_weight import compute_sample_weight
    sample_weights = compute_sample_weight('balanced', y)
    
    print("Training XGBoost Classifier...")
    model = xgb.XGBClassifier(
        objective='multi:softprob',
        num_class=4,
        eval_metric='mlogloss',
        n_estimators=80,      # Prevent 100% perfect overfitting
        max_depth=4,          
        learning_rate=0.08,   
        subsample=0.8,        
        colsample_bytree=0.8, 
        gamma=0.2,            
        random_state=42,
        use_label_encoder=False
    )
    
    # Train on the complete historical record to maximize exposure to rare Edge Cases
    model.fit(X_scaled, y, sample_weight=sample_weights)
    
    # Full Historical Accuracy Evaluation
    full_preds = model.predict(X_scaled)
    full_acc = accuracy_score(y, full_preds)
    print(f"\nOverall Historical Dataset Accuracy: {full_acc*100:.2f}%")
    
    print("\nClassification Report (Full Dataset) [0: Open, 1: Delay, 2: Early Release, 3: Closure]")
    print(classification_report(y, full_preds, zero_division=0))
        
    # Save the full ML pipeline
    print("\nSaving model pipeline...")
    joblib.dump({
        'scaler': scaler,
        'model': model,
        'features': feature_cols
    }, 'xgboost_snow_model.pkl')
    
    print("Done! Model saved to xgboost_snow_model.pkl")

if __name__ == "__main__":
    main()
