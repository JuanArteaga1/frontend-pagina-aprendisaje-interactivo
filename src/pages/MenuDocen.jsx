import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MenuDocente from "../components/MenuAdmi_Doc";

function MenuDocen() {
  const userRole = "docente";

  // Estado para saber si el menú está colapsado
  const [colapsado, setColapsado] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Menú Lateral */}
      <MenuDocente rol={userRole} colapsado={colapsado} setColapsado={setColapsado} />

      {/* Contenido Principal */}
      <main
        className={`flex-1 p-6 sm:p-8 overflow-y-auto transition-all duration-300
        ${colapsado ? "lg:ml-20" : "lg:ml 64"}`}
      >
        <div className="max-w-6xl lg:max-w-full mx-auto">
          {/* Sección de Bienvenida */}
          <div className="text-center mt-16 mb-12">
            <div className="relative inline-block mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                ¡Bienvenido Docente!
              </h1>
              <span className="absolute -top-4 -right-6 text-2xl">👋</span>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
              Tu panel de control para gestionar proyectos educativos
            </p>
          </div>

          {/* Tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-blue-500 text-3xl mb-3">📚</div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Proyectos Activos</h2>
              <p className="text-gray-600">Revisa tus proyectos en desarrollo</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-blue-500 text-3xl mb-3">✅</div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Tareas Pendientes</h2>
              <p className="text-gray-600">Administra tus actividades próximas</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-blue-500 text-3xl mb-3">💡</div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Nuevo Proyecto</h2>
              <p className="text-gray-600">Comienza una nueva iniciativa educativa</p>
            </div>
          </div>

          {/* Contenido dinámico */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MenuDocen;