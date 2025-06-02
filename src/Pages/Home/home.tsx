import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/card";
import "./home.css";
import imagenHome from "../../assets/Imagen.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal/modal";
import type { PredictionResponse } from "../../Services/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);

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
        <Card height="80px">
          <h2>¿Quienes somos?</h2>
        </Card>
        <Card height="80px">
          <h2>Información del modelo</h2>
        </Card>
        <Card height="80px">
          <h2>¿Cómo funciona?</h2>
        </Card>
      </div>
      <button
        className="use-model-btn"
        onClick={() => navigate("/form")}
      >
        Usar modelo
      </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {result && (
          <div className="resultado">
            <h3>🧠 Resultado del análisis</h3>
            <p>🔢 <b>Predicción técnica:</b> {result.prediction} <br/> 
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
    </div>
  );
};

export default Home;
