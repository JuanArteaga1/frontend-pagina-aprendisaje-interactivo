import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuDocente from '../components/MenuAdmi_Doc';

function MenuDocen() {
  const userRole = 'admin';
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú Lateral (no modificado) */}
      <div className="w-64 bg-gray-800 text-white">
        <MenuDocente rol={userRole} />
      </div>

      {/* Contenido Principal - Centrado */}
      <div className="flex-1 overflow-y-auto ml-64">
        <div className="max-w-6xl mx-auto px-8 py-8"> {/* Nuevo contenedor centrado */}
          
          {/* Contenedor de bienvenida (sin cambios) */}
          <section className="text-center mb-10">
            <div className="relative inline-block">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                ¡Bienvenido Administrador!
                <span className="absolute -top-4 -right-6 text-2xl">🌟</span>
                <span className="absolute -bottom-4 -left-6 text-2xl">🎓</span>
              </h1>
            </div>
            <p className="mt-4 text-xl text-blue-600">
              Tu panel de control para gestionar proyectos educativos
            </p>
          </section>

          {/* Tarjetas de acceso rápido (sin cambios) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="text-blue-500 text-3xl mb-3">📚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Proyectos Activos</h3>
              <p className="text-gray-600">Revisa tus proyectos en desarrollo</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="text-blue-500 text-3xl mb-3">✅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tareas Pendientes</h3>
              <p className="text-gray-600">Administra tus actividades próximas</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="text-blue-500 text-3xl mb-3">💡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nuevo Proyecto</h3>
              <p className="text-gray-600">Comienza una nueva iniciativa educativa</p>
            </div>
          </section>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MenuDocen;