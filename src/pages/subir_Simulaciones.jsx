import React, { useState } from "react";
import imagenSimulacion from "../img/estudiantes.jpg";
import Navbar from "../components/Navbar";
import "./SubirSimulaciones.css";
import subir_archivo from "../img/subir_archivo.png"

const SubirSimulaciones = () => {
    const [loggedIn] = useState(true);

    return (
        <>
            <Navbar loggedIn={loggedIn} />
            <div className="contenedor">
                {/* Imagen a la izquierda */}
                <div className="imagen-container">
                    <img src={imagenSimulacion} alt="Simulación" className="imagen" />
                </div>

                 {/* Formulario */}
                <div className="formulario-container">
                    <h1 className="titulo">SUBIR SIMULACIONES</h1>
                    <form>
                        <label>Nombre:</label>
                        <input type="text" placeholder="Ingrese el nombre" />

                        <label>Descripción:</label>
                        <textarea placeholder="Descripción del proyecto"></textarea>

                        <label>Autores:</label>
                        <input type="text" placeholder="Nombres de los autores" />

                        <label>Fecha de realización:</label>
                        <input type="date" />

                        <h3>Cargar de archivos</h3>
                        <div className="archivo-grid">
                            <div className="archivo-box">
                                <img src={subir_archivo}/>
                                <p>SUBIR SIMULACION</p>
                                <input type="file" accept="." />
                            </div>
                            <div className="archivo-box">
                                <img src={subir_archivo} />
                                <p>Subir documentos</p>
                                <input type="file" accept=".pdf,.doc,.docx" multiple />
                            </div>
                            <div className="archivo-box pequeño">
                                <img src={subir_archivo} />
                                <p>SUBIR VIDEO</p>
                                <input type="file" accept=".mp4" multiple />
                            </div>
                        </div>

                        <button type="submit" className="btn-enviar">Enviar</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SubirSimulaciones;
