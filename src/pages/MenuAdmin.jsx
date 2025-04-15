import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuDocente from '../components/MenuAdmi_Doc';
import Navbar from '../components/Navbar';

function MenuDocen() {
  const userRole = 'admin';
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar fijo en la parte superior */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>
      
      {/* Contenedor principal con espacio para el navbar */}
      <main className="flex flex-1 pt-20"> {/* Ajuste de padding-top para el navbar */}
        {/* Menú lateral fijo */}
        <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white shadow-md z-40">
          <MenuDocente rol={userRole} />
        </aside>
        
        {/* Contenido principal con margen para el menú lateral */}
        <div className="ml-64 p-8 w-[calc(100%-16rem)]">
          {/* Contenedor de bienvenida */}
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

          {/* Tarjetas de acceso rápido */}
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
      </main>
    </div>
  );
}

export default MenuDocen;