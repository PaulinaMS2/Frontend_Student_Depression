
export interface PredictionRequest {
  gender: string;
  age: number;
  city: string;
  sleep_hours: string;
  diet: string;
  hours_dedicated: number;
  mental_illness_history: string;
  study_satisfaction_level_cat: string;
  financial_stress_cat: string;
  academic_pressure_cat: string;
  cgpa_cat: string;
  degree_grouped: string;
}

export interface PredictionResponse {
  prediction: number;
  probability: number;
  interpretation: string;
}