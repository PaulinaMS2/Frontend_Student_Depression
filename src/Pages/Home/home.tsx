import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/card";
import "./home.css";
import imagenHome from "../../assets/Imagen.png";
import foto1 from "../../assets/Jero.jpeg"; 
import foto2 from "../../assets/Manu.jpeg";
import foto3 from "../../assets/Pau.jpeg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal/modal";
import type { PredictionResponse } from "../../Services/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  // Estado para el modal de información del modelo
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  // Estado para el modal de "¿Cómo funciona?"
  const [howModalOpen, setHowModalOpen] = useState(false);
  // Estado para el modal de "¿Quiénes somos?"
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("predictionResult");
    if (stored) {
      setResult(JSON.parse(stored));
      setModalOpen(true);
      localStorage.removeItem("predictionResult");
    }
  }, []);

  return (
    <div className="home-container">
      <motion.img
        src={imagenHome}
        alt="Imagen de inicio"
        className="img-home"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="card-row">
        <Card height="80px" onClick={() => setAboutModalOpen(true)}>
          <h2>¿Quienes somos?</h2>
        </Card>
        <Card height="80px" onClick={() => setInfoModalOpen(true)}>
          <h2>Información del modelo</h2>
        </Card>
        <Card height="80px" onClick={() => setHowModalOpen(true)}>
          <h2>¿Cómo funciona?</h2>
        </Card>
      </div>
      <button
        className="use-model-btn"
        onClick={() => navigate("/form")}
      >
        Usar modelo
      </button>

      {/* Modal de resultado */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {result && (
          <div className="resultado">
            <h3>🧠 Resultado del análisis</h3>
            <p>🔢 <b>Predicción técnica:</b> {result.prediction} <br />
              {result.interpretation} </p>
            <p>📊 <b>Probabilidad estimada:</b> {(result.probability * 100).toFixed(2)}%</p>
            <div style={{ marginTop: "1em" }}>
              <p style={{ margin: 0 }}>
                Se interpreta como que aproximadamente el {(result.probability * 100).toFixed(0)}% de los árboles de decisión del modelo <br />
                coinciden en que los datos analizados presentan patrones asociados con la clase "Depresión".
              </p>
            </div>
            <div style={{ marginTop: "1em", color: "#b10000", fontWeight: 500 }}>
              ⚠️  Este resultado es una estimación estadística
            </div>
          </div>
        )}
      </Modal>
      {/* Modal de información del modelo */}
      <Modal isOpen={infoModalOpen} onClose={() => setInfoModalOpen(false)}>
        <div className="info-modelo-modal">
          <h3>Información del modelo</h3>
          <ul style={{ paddingLeft: "1.2em" }}>
            <li><b>Tipo de modelo:</b> Random Forest (Bosque Aleatorio)</li>
            <li><b>Algoritmo base:</b> Aprendizaje supervisado – clasificación binaria</li>
            <li><b>Conjunto de datos utilizado:</b> Student Depression Dataset – Kaggle (población: estudiantes universitarios en la India)</li>
            <li><b>Población objetivo:</b> Estudiantes universitarios</li>
            <li><b>Variables consideradas:</b> - Género - Edad - Ciudad de residencia - Horas de sueño - Tipo de alimentación - Horas dedicadas al estudio/trabajo diariamente - Antecedentes de enfermedades mentales - Nivel de satisfacción con los estudios - Estrés financiero - Presión académica - Promedio académico (CGPA) - Nivel educativo</li>
            <li><b>Objetivo del modelo:</b> Predecir si un estudiante muestra o no indicadores compatibles con depresión, a partir de variables relacionadas con su estilo de vida, entorno académico y bienestar emocional.</li>
          </ul>
          <h4>Métricas de desempeño:</h4>
          <ul style={{ paddingLeft: "1.2em" }}>
            <li>Precisión (Accuracy)</li>
            <li>Recall (Sensibilidad)</li>
            <li>F1-Score</li>
            <li>Matriz de Confusión </li>
          </ul>
        </div>
      </Modal>
      {/* Modal de cómo funciona */}
      <Modal isOpen={howModalOpen} onClose={() => setHowModalOpen(false)}>
        <div className="info-modelo-modal">
          <h3>¿Cómo funciona?</h3>
          <p>
            Este sistema utiliza un modelo de inteligencia artificial que fue entrenado con información de estudiantes universitarios de la India.
            A partir de sus respuestas sobre temas como presión académica, calidad del sueño, alimentación, antecedentes familiares, edad, género,
            el modelo aprende a detectar patrones que suelen estar presentes en casos compatibles con depresión.
          </p>
          <p>
            Antes de construir el modelo, los datos fueron preparados cuidadosamente: se limpiaron errores, se transformaron respuestas en valores numéricos y se organizaron de forma que el modelo pudiera analizarlos de manera eficiente.
          </p>
          <p>
            El tipo de modelo utilizado se llama <b>"Random Forest"</b>, una técnica que toma decisiones combinando muchos árboles que evalúan diferentes aspectos de la información. Esta estrategia permite tener una visión más completa y precisa.
          </p>
          <p>
            El sistema no se basa en una única señal, sino en la combinación de varios factores. Por eso, incluso si una variable no parece crítica por sí sola, puede influir en el resultado final cuando se analiza junto a otras.
          </p>
        </div>
      </Modal>
      {/* Modal de quienes somos */}
      <Modal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)}>
        <div className="info-modelo-modal" style={{ textAlign: "center" }}>
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "5em",
            marginBottom: "1.5em",
            flexWrap: "wrap"
          }}>
            <div>
              <img src={foto1} alt="Jero" style={{
                width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "3px solid #a78bfa"
              }} />
              <div style={{
                marginTop: 8,
                fontFamily: "'Pacifico', cursive, sans-serif",
                fontSize: "1.1em",
                color: "#7e0275"
              }}>Jerónimo Bedoya</div>
            </div>
            <div>
              <img src={foto2} alt="Manu" style={{
                width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "3px solid #a78bfa"
              }} />
              <div style={{
                marginTop: 8,
                fontFamily: "'Pacifico', cursive, sans-serif",
                fontSize: "1.1em",
                color: "#7e0275"
              }}>Manuela Moreno</div>
            </div>
            <div>
              <img src={foto3} alt="Pau" style={{
                width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "3px solid #a78bfa"
              }} />
              <div style={{
                marginTop: 8,
                fontFamily: "'Pacifico', cursive, sans-serif",
                fontSize: "1.1em",
                color: "#7e0275"
              }}>Paulina Muñoz</div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: "1.05em" }}>
            Este proyecto fue desarrollado con fines educativos, como parte de nuestro proyecto para el módulo  <b> Proyecto I </b> en la especialización en ciencia de datos e IA en Universidad de Medellín.
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;