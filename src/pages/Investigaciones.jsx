import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Investigaciones = () => {
  const [loggedIn] = useState(true);
  const navigate = useNavigate(); 
  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <p>¿Investigaciones?</p>
      {/* Botón que redirige a SubirInvestigaciones */}
      
    </div>
  );
};

// Estilos para el botón
const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Investigaciones;
