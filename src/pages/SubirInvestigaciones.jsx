import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./SubirInvestigaciones.css";
import subirInvestigacionesImg from "../img/Subir_Investigaciones.jpg"; // Importa la imagen correctamente

const SubirInvestigaciones = () => {
    const [loggedIn] = useState(true); 
    const [imagen, setImagen] = useState(null); 
    const [texto, setTexto] = useState(""); 
    const [archivo, setArchivo] = useState(null); 

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Imagen:", imagen);
        console.log("Texto:", texto);
        console.log("Archivo:", archivo);
        alert("Investigación subida correctamente");
    };

    return (
        <>
            <Navbar loggedIn={loggedIn} />
            <div className="contenedor">
                {/* Formulario */}
                <div className="formulario-container">
                    <h1 className="titulo">SUBIR INVESTIGACIÓN</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Campo para el título */}
                        <label>Título:</label>
                        <input
                            type="text"
                            placeholder="Ingrese el título de la investigación"
                            required
                        />

                        {/* Campo para la descripción */}
                        <label>Descripción:</label>
                        <textarea
                            placeholder="Descripción de la investigación"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            required
                        ></textarea>

                        {/* Campo para subir una imagen */}
                        <label>Subir imagen:</label>
                        <div className="archivo-box">
                            <img src={subirInvestigacionesImg} alt="Subir imagen" />
                            <p>SUBIR IMAGEN</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImagen(e.target.files[0])}
                            />
                        </div>

                        {/* Campo para subir un archivo (PDF o artículo) */}
                        <label>Subir artículo (PDF):</label>
                        <div className="archivo-box">
                            <img src={subirInvestigacionesImg} alt="Subir archivo" />
                            <p>SUBIR ARTÍCULO</p>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setArchivo(e.target.files[0])}
                            />
                        </div>

                        {/* Botón para enviar el formulario */}
                        <button type="submit" className="btn-enviar">
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SubirInvestigaciones;