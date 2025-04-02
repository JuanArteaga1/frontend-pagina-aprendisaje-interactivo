import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const DetalleProyecto = () => {
    const { proyecto } = useParams();

    return (
        <>
            <Navbar /> {/* Mueve el Navbar fuera del div detalle-proyecto */}
            <div className="detalle-proyecto">
                <div className="detalle-contenedor">
                    {/* Sección superior */}
                    <div className="detalle-header">
                        <div className="imagen-app">
                            <img src="/img/fotoapp.png" alt={`Foto de ${proyecto}`} />
                        </div>
                        <div className="info-app">
                            <h2>{proyecto}</h2>
                            <p>[Autor]</p>
                        </div>
                        <div className="descargar">
                            <button className="boton-descargar">Descargar</button>
                        </div>
                    </div>
                    
                    {/* Sección media: Video e imágenes */}
                    <div className="detalle-media">
                        <video controls>
                            <source src="video/video.mp4" type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>
                        <div className="imagenes">
                            <img src="/img/fotoapp.png" alt="Imagen 1" />
                            <img src="/img/fotoapp.png" alt="Imagen 2" />
                        </div>
                    </div>
                    
                    {/* Sección inferior: Información y Documentación */}
                    <div className="detalle-inferior">
                        <div className="descripcion">
                            <h3>Sobre esta aplicación:</h3>
                            <p>Descripción del proyecto o simulación {proyecto}.</p>
                            <p><strong>Autores:</strong> Autor 1, Autor 2</p>
                            <p><strong>Fecha de creación:</strong> 2023</p>
                        </div>
                        <div className="documentos">
                            <h3>Documentación:</h3>
                            <p>Aquí se subirán los documentos relevantes, como manuales o guías de usuario.</p>
                            <a href="documento1.pdf" target="_blank" rel="noopener noreferrer">Documento 1 (PDF)</a>
                            <a href="documento2.pdf" target="_blank" rel="noopener noreferrer">Documento 2 (PDF)</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default DetalleProyecto;

