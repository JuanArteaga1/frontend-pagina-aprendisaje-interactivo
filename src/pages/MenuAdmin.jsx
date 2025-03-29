import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuAdministrador from '../components/MenuAdmi_Doc';
import Navbar from '../components/Navbar';

function MenuAdmin() {
  // En una aplicación real, esto vendría de tu sistema de autenticación
  const userRole = 'admin'; // 'admin' o 'docente'
  
  return (
    <div> <Navbar/>
    <div className="flex h-screen bg-gray-100">
      {/* Navbar en la parte superior */}
      
      {/* Menú Lateral para Administrador */}
      <MenuAdministrador   rol={userRole}/>
      
      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto ml-64 p-6 pt-20">
        <Outlet /> {/* Esto renderizará las rutas anidadas */}
      </div>
    </div>
    </div>
  );
}

export default MenuAdmin;
