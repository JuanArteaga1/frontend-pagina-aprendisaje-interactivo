import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Simulaciones = () => {
    const navigate = useNavigate();

    return (
        <div>
             <Navbar />
            <h1>Simulaciones</h1>
            <button onClick={() => navigate(-1)}>⬅️ Volver</button>
        </div>
    );
};

export default Simulaciones;

