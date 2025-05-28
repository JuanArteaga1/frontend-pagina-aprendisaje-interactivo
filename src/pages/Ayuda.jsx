import React from "react";


const AyudaT = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Título */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Creadores de la Página</h1>
      
      {/* Imagen del equipo */}
      <img 
        src="../img/grupo.jpg"
        alt="Equipo de Desarrollo" 
        className="w-2/3 md:w-1/3 rounded-lg shadow-lg mb-6"
      />

      {/* Descripción */}
      <p className="text-lg text-gray-600 text-center max-w-2xl mb-6">
        Somos un equipo apasionado por la tecnología y el aprendizaje. 
        Nuestro objetivo es crear herramientas interactivas que faciliten 
        el acceso a la información y el conocimiento.
      </p>

      {/* Nombres del equipo */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-3">Equipo de Desarrollo</h2>
        <ul className="text-center text-gray-600">
          <li>🔹 Kevin</li>
          <li>🔹 Stiven</li>
          <li>🔹 Manuel</li>
          <li>🔹 Diana</li>
          <li>🔹 Valentina</li>
        </ul>
      </div>

      {/* Pie de página */}
      <footer className="mt-6 text-gray-500 text-sm">
        © 2025 Todos los derechos reservados - Creado por nuestro equipo
      </footer>
    </div>
  );
};

export default AyudaT;