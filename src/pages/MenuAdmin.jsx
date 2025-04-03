import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuAdministrador from '../components/MenuAdmi_Doc';
import Navbar from '../components/Navbar';
import imagenAdmin from '../img/BienvenidoAdmin.png';

function MenuAdmin() {
  // En una aplicación real, esto vendría de tu sistema de autenticación
  const userRole = 'admin'; // 'admin' o 'docente'
  
  return (
    <div> <Navbar/>
    <div className="flex h-screen bg-gray-100">
      {/* Navbar en la parte superior */}
      
      {/* Menú Lateral para Administrador */}
      <MenuAdministrador rol={userRole}/>
      
      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto ml-64 p-6 pt-20">
        {/* Ejemplo de cómo agregar una imagen */}
        <img 
          src= {imagenAdmin}
          alt="Descripción de la imagen" 
          className="w-full md:w-3/4 lg:w-2/3 max-w-6xl mx-auto mb-4 rounded-lg shadow-md" 
        />
        <Outlet /> {/* Esto renderizará las rutas anidadas */}
      </div>
    </div>
    </div>
  );
}

export default MenuAdmin;
