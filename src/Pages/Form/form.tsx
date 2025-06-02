import React, { useState } from "react";
import Dropdown from "../../Components/Dropdown/dropdown";
import apiService from "../../Services/apiService";
import type { PredictionRequest, PredictionResponse } from "../../Services/types";
import "./form.css";
import { useNavigate } from "react-router-dom";

const genderOptions = [
  { label: "Masculino", value: "Male" },
  { label: "Femenino", value: "Female" },
];

const cityOptions = [
  { label: "Visakhapatnam", value: "Visakhapatnam" },
  { label: "Bangalore", value: "Bangalore" },
  { label: "Srinagar", value: "Srinagar" },
  { label: "Varanasi", value: "Varanasi" },
  { label: "Jaipur", value: "Jaipur" },
  { label: "Pune", value: "Pune" },
  { label: "Thane", value: "Thane" },
  { label: "Chennai", value: "Chennai" },
  { label: "Nagpur", value: "Nagpur" },
  { label: "Nashik", value: "Nashik" },
  { label: "Vadodara", value: "Vadodara" },
  { label: "Kalyan", value: "Kalyan" },
  { label: "Rajkot", value: "Rajkot" },
  { label: "Ahmedabad", value: "Ahmedabad" },
  { label: "Kolkata", value: "Kolkata" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Lucknow", value: "Lucknow" },
  { label: "Indore", value: "Indore" },
  { label: "Surat", value: "Surat" },
  { label: "Ludhiana", value: "Ludhiana" },
  { label: "Bhopal", value: "Bhopal" },
  { label: "Meerut", value: "Meerut" },
  { label: "Agra", value: "Agra" },
  { label: "Ghaziabad", value: "Ghaziabad" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Vasai-Virar", value: "Vasai-Virar" },
  { label: "Kanpur", value: "Kanpur" },
  { label: "Patna", value: "Patna" },
  { label: "Faridabad", value: "Faridabad" },
  { label: "Delhi", value: "Delhi" },
];

const sleepOptions = [
  { label: "Menos de 5 horas", value: "Less than 5 hours" },
  { label: "5-6 horas", value: "5-6 hours" },
  { label: "7-8 horas", value: "7-8 hours" },
  { label: "Más de 8 horas", value: "More than 8 hours" },
  { label: "Otro", value: "Others" },
];

const dietOptions = [
  { label: "Saludable", value: "Healthy" },
  { label: "Moderada", value: "Moderate" },
  { label: "Poco saludable", value: "Unhealthy" },
  { label: "Otro", value: "Others" },
];

const mentalIllnessOptions = [
  { label: "No", value: "No" },
  { label: "Sí", value: "Yes" },
];

const satisfactionOptions = [
  { label: "Bajo", value: "bajo" },
  { label: "Medio", value: "medio" },
  { label: "Medio alto", value: "medio alto" },
  { label: "Alto", value: "alto" },
];

const stressOptions = [
  { label: "Bajo", value: "bajo" },
  { label: "Medio", value: "medio" },
  { label: "Medio alto", value: "medio alto" },
  { label: "Alto", value: "alto" },
];

const pressureOptions = [
  { label: "Alto", value: "alto" },
  { label: "Medio", value: "medio" },
  { label: "Medio alto", value: "medio alto" },
  { label: "Bajo", value: "bajo" },
];

const cgpaOptions = [
  { label: "Alto", value: "alto" },
  { label: "Medio alto", value: "medio alto" },
  { label: "Bajo", value: "bajo" },
];

const degreeOptions = [
  { label: "Licenciatura", value: "Bachelor" },
  { label: "Maestría", value: "Master" },
  { label: "Doctorado", value: "Doctorate" },
  { label: "Preparatoria", value: "Class 12" },
  { label: "Otro", value: "Others" },
];

const initialState: PredictionRequest = {
  gender: "",
  age: 18,
  city: "",
  sleep_hours: "",
  diet: "",
  hours_dedicated: 0,
  mental_illness_history: "",
  study_satisfaction_level_cat: "",
  financial_stress_cat: "",
  academic_pressure_cat: "",
  cgpa_cat: "",
  degree_grouped: "",
};

const Formulario: React.FC = () => {
  const [form, setForm] = useState<PredictionRequest>(initialState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const navigate = useNavigate();

  const handleChange = <K extends keyof PredictionRequest>(
    field: K,
    value: PredictionRequest[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    console.log(result);
    try {
      const res = await apiService.predict(form);
      // Guarda el resultado en localStorage
      localStorage.setItem("predictionResult", JSON.stringify(res));
      // Navega a Home
      navigate("/");
    } catch (err) {
      alert("Error enviando el formulario");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
    <form className="formulario" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-section datos-personales">
          <h2>Datos personales</h2>
          <Dropdown
            options={genderOptions}
            placeholder="¿Cuál es tu género?"
            value={form.gender}
            onChange={(v) => handleChange("gender", v)}
          />
          <Dropdown
            options={cityOptions}
            placeholder="¿En qué ciudad vives?"
            value={form.city}
            onChange={(v) => handleChange("city", v)}
            
          />
          <div className="degree-grouped">
          <Dropdown
            options={degreeOptions}
            placeholder="Nivel educativo"
            value={form.degree_grouped}
            onChange={(v) => handleChange("degree_grouped", v)}
          />
          </div>
          <div>
            <label>¿Cuál es tu edad?</label>
            <input
              type="number"
              min={10}
              max={100}
              value={form.age}
              onChange={(e) => handleChange("age", Number(e.target.value))}
            />
          </div>
        </div>

        <div className="form-section habitos">
          <h2>Hábitos</h2>
          <Dropdown
            options={sleepOptions}
            placeholder="¿Cuántas horas duermes?"
            value={form.sleep_hours}
            onChange={(v) => handleChange("sleep_hours", v)}
          />
          <Dropdown
            options={dietOptions}
            placeholder="Clasifica tu alimentación"
            value={form.diet}
            onChange={(v) => handleChange("diet", v)}
          />
          <div className="hours-dedicated full-width">
            <label>¿Cuántas horas dedicas al estudio/trabajo por día?</label>
            <input
              className="hours-input"
              type="number"
              min={0}
              max={24}
              value={form.hours_dedicated}
              onChange={(e) => handleChange("hours_dedicated", Number(e.target.value))}
            />
          </div>
        </div>

        <div className="form-section emocionales">
          <h2>Factores emocionales/mentales</h2>
          <div>
            <label>¿Tienes antecedentes familiares de enfermedades mentales?</label>
            <div className="radio-group">
              {mentalIllnessOptions.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    className={form.mental_illness_history === opt.value ? "selected" : ""}
                    onClick={() => handleChange("mental_illness_history", opt.value)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    </div>
        
          <Dropdown
            options={satisfactionOptions}
            placeholder="Satisfacción con tus estudios"
            value={form.study_satisfaction_level_cat}
            onChange={(v) => handleChange("study_satisfaction_level_cat", v)}
          />
      
        
          <Dropdown
            options={stressOptions}
            placeholder="Nivel de estrés financiero"
            value={form.financial_stress_cat}
            onChange={(v) => handleChange("financial_stress_cat", v)}
          />
    
          <Dropdown
            options={pressureOptions}
            placeholder="Nivel de presión académica"
            value={form.academic_pressure_cat}
            onChange={(v) => handleChange("academic_pressure_cat", v)}
          />
          <Dropdown
            options={cgpaOptions}
            placeholder="Rendimiento académico"
            value={form.cgpa_cat}
            onChange={(v) => handleChange("cgpa_cat", v)}
          />
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>

    </form>
    </div>
  );
};

export default Formulario;