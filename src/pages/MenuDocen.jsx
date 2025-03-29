import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuDocente from '../components/MenuAdmi_Doc';
import Navbar from '../components/Navbar';

function MenuDocen() {
  // En una aplicación real, esto vendría de tu sistema de autenticación
  const userRole = 'docente'; // 'admin' o 'docente'
  
  return (
    <div> <Navbar/>
    <div className="flex h-screen bg-gray-100">
      {/* Navbar en la parte superior */}
      
      {/* Menú Lateral para Administrador */}
      <MenuDocente   rol={userRole}/>
      
      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto ml-64 p-6 pt-20">
        <Outlet /> {/* Esto renderizará las rutas anidadas */}
      </div>
    </div>
    </div>
  );
}

export default MenuDocen;