import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuDocente from '../components/MenuAdmi_Doc';
import Navbar from '../components/Navbar';

function MenuDocen() {
  const userRole = 'admin';
  
  return (
    <div>
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        <MenuDocente rol={userRole} />
        
        <div className="flex-1 overflow-y-auto ml-64 p-6 pt-20">
          {/* Contenedor de bienvenida */}
          <div className="text-center mb-8 animate-fade-in-down">
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-float">
                ¡Bienvenido Administrador!
                <span className="absolute -top-6 -right-8 text-4xl animate-spin-slow">🌟</span>
                <span className="absolute -bottom-6 -left-8 text-4xl animate-bounce">🎓</span>
              </h1>
            </div>
            <p className="mt-6 text-2xl text-blue-500 animate-slide-in-blurred-top animate-delay-300">
              Tu panel de control para gestionar proyectos educativos
            </p>
          </div>

          {/* Tarjetas de acceso rápido */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-jump-in animate-delay-500">
              <div className="text-blue-400 text-4xl mb-2">📚</div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">Proyectos Activos</h3>
              <p className="text-blue-500">Revisa tus proyectos en desarrollo</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-jump-in animate-delay-700">
              <div className="text-blue-400 text-4xl mb-2">✅</div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">Tareas Pendientes</h3>
              <p className="text-blue-500">Administra tus actividades próximas</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-jump-in animate-delay-1000">
              <div className="text-blue-400 text-4xl mb-2">💡</div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">Nuevo Proyecto</h3>
              <p className="text-blue-500">Comienza una nueva iniciativa educativa</p>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MenuDocen;