import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuDocente from '../components/MenuAdmi_Doc';

function MenuDocen() {
  const userRole = 'docente';
  
  return (
      <div className="flex h-screen bg-gray-100">
        {/* Menú Lateral Fijo */}
        <div className="fixed h-full w-64 bg-gray-800 text-white z-10">
        <MenuDocente rol={userRole} />
        </div>
              {/* Contenido Principal */}
              <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {/* Sección de Bienvenida */}
                <div className="text-center mb-12">
                  {/* Título principal con efecto de gradiente */}
                  <div className="relative inline-block mb-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                      ¡Bienvenido Administrador!
                    </h1>
                    <span className="absolute -top-4 -right-6 text-2xl">👋</span>
                  </div>
                  
                  {/* Subtítulo */}
                  <p className="text-xl md:text-2xl text-gray-600">
                    Tu panel de control para gestionar proyectos educativos
                  </p>
                </div>
          
                {/* Tarjetas de Acceso Rápido */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Tarjeta 1 - Proyectos Activos */}
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-blue-500 text-3xl mb-3">📚</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Proyectos Activos</h2>
                    <p className="text-gray-600">Revisa tus proyectos en desarrollo</p>
                  </div>
                  
                  {/* Tarjeta 2 - Tareas Pendientes */}
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-blue-500 text-3xl mb-3">✅</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Tareas Pendientes</h2>
                    <p className="text-gray-600">Administra tus actividades próximas</p>
                  </div>
                  
                  {/* Tarjeta 3 - Nuevo Proyecto */}
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-blue-500 text-3xl mb-3">💡</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Nuevo Proyecto</h2>
                    <p className="text-gray-600">Comienza una nueva iniciativa educativa</p>
                  </div>
                </div>
        
                {/* Contenido dinámico de rutas */}
                <Outlet />
              </main>
            </div>
          );
        }

export default MenuDocen;