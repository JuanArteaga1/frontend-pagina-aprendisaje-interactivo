import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Simulaciones = () => {
    const navigate = useNavigate();

    // Datos de prueba (luego se reemplazará con datos reales de la base de datos)
    const simulaciones = {
        Fisica: ["Simulación A", "Simulación B", "Simulación C"],
        Matematica: ["Simulación D", "Simulación E", "Simulación F"],
        "Ingeniería Civil": [] /* Entre comillas porque JS no permite espacios */
    };

    return (
        <div>
            <Navbar/>

            {/* Contenedor principal de Simulaciones */}
            <div className="contenido-simulaciones">
                {/* Título */}
                <h1 className="titulo-simulaciones">Simulaciones</h1>

                {/* Imagen de presentación */}
                <div className="presentacion">
                    <img src="img/970x250.jpg" alt="Presentación Simulaciones" />
                </div>

                {/* Contenedor de ordenamiento y simulaciones */}
                <div className="contenedor-ordenamiento-simulaciones">
                    {/* Botón de ordenamiento */}
                    <div className="ordenamiento">
                        <button className="ordenar-btn">Ordenar por: ▼</button>
                    </div>

                    {/* Contenedor de categorías */}
                    <div className="categorias">
                        {Object.keys(simulaciones).map((categoria) => ( /*Object Keys es para obtener los nombres de las categorias y el map es para recorrer cada una de ellas que exista y mostrarlas**/ 
                            <div className="categoria" key={categoria}>
                                <h2>{categoria}</h2>
                                <div className="cards-container">
                                    {simulaciones[categoria].length > 0 ? (  /* Obtiene la lista de simulaciones dentro de esa categoría */
                                        simulaciones[categoria].map((simulacion, index) => ( /* Recorre esa lista y crea una tarjeta para cada simulacion/aplicacion/proyecto que se suba */
                                            <div className="card" key={index}>
                                                <div className="card-inner">
                                                    <div className="card-front">
                                                        {simulacion}
                                                    </div>
                                                    <div className="card-back">
                                                        <h3>{simulacion}</h3>
                                                        <button onClick={() => goToSimulacion(simulacion)}>Ver más</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay simulaciones disponibles</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Simulaciones;
