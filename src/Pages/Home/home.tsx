import React from "react";
import Card from "../../Components/Card/card";
import "./home.css";
import imagenHome from "../../assets/Imagen.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
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
    </div>
  );
};

export default Home;
