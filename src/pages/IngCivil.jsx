import React from "react";
import Navbar from "../components/Navbar";
import CategoriaProyectos from "../components/CategoriaProyectos";

const simulacionesIngCivil = {
  "Ingeniería Civil": ["Simulación 1", "Simulación 2", "Simulación 3"]
};

const aplicacionesIngCivil = {
  "Ingeniería Civil": ["App 1", "App 2"]
};

const IngCivil = () => {
  return (
    <div>
      <Navbar />
      
      {/* Sección de Simulaciones */}
      <CategoriaProyectos 
        titulo="Simulaciones de Ingeniería Civil" 
        categoria="Ingeniería Civil" 
        proyectos={simulacionesIngCivil} 
        showImage={false} // Oculta la imagen
        showButton={false} // Oculta el botón
      />

      {/* Sección de Aplicaciones Móviles */}
      <CategoriaProyectos 
        titulo="Aplicaciones Móviles de Ingeniería Civil" 
        categoria="Ingeniería Civil" 
        proyectos={aplicacionesIngCivil} 
        showImage={false} // Oculta la imagen
        showButton={false} // Oculta el botón
      />
    </div>
  );
};

export default IngCivil;
