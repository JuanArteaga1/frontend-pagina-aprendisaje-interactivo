import React from "react";
import { useNavigate } from "react-router-dom";

const ListaProyectos = ({ titulo, proyectos }) => {
    const navigate = useNavigate();

    const goToDetalle = (proyecto) => {
        navigate(`/detalle/${proyecto}`);
    };

    return (
        <div className="contenido-proyectos">
            <h1 className="titulo-proyectos">{titulo}</h1>

            <div className="presentacion">
                <img src="img/970x250.jpg" alt={`Presentación de ${titulo}`} />
            </div>

            <div className="contenedor-ordenamiento-proyectos">
                <div className="ordenamiento">
                    <button className="ordenar-btn">Ordenar por: ▼</button>
                </div>

                <div className="categorias">
                    {Object.keys(proyectos).map((categoria) => (
                        <div className="categoria" key={categoria}>
                            <h2>{categoria}</h2>
                            <div className="cards-container">
                                {proyectos[categoria].length > 0 ? (
                                    proyectos[categoria].map((proyecto, index) => (
                                        <div className="card" key={index}>
                                            <div className="card-inner">
                                                <div className="card-front">
                                                    <img src="/img/fotoapp.png" alt={`Imagen de ${proyecto}`} /> {/* Aquí está la imagen */}
                                                    {/* El nombre del proyecto ya no está aquí */}
                                                </div>
                                                <div className="card-back">
                                                    <h3>{proyecto}</h3>
                                                    <button onClick={() => goToDetalle(proyecto)}>Ver más</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay proyectos disponibles</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListaProyectos;

