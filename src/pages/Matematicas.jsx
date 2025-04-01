import React from "react";
import Navbar from "../components/Navbar";
import CategoriaProyectos from "../components/CategoriaProyectos";

const simulacionesMatematicas = {
  Matematicas: ["Simulación A", "Simulación B"]
};

const aplicacionesMatematicas = {
  Matematicas: ["App 3", "App 4"]
};

const Matematicas = () => {
  return (
    <div>
      <Navbar />
      
      {/* Sección de Simulaciones */}
      <CategoriaProyectos 
        titulo="Simulaciones de Matemáticas" 
        categoria="Matematicas" 
        proyectos={simulacionesMatematicas} 
        showImage={false} // Oculta la imagen
        showButton={false} // Oculta el botón
      />

      {/* Sección de Aplicaciones Móviles */}
      <CategoriaProyectos 
        titulo="Aplicaciones Móviles de Matemáticas" 
        categoria="Matematicas" 
        proyectos={aplicacionesMatematicas} 
        showImage={false} // Oculta la imagen
        showButton={false} // Oculta el botón
      />
    </div>
  );
};

export default Matematicas;
