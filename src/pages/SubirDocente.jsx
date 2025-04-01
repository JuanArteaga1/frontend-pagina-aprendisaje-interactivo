import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MenuLateral from "../components/MenuAdmi_Doc";
import { 
    FaUserGraduate, // Icono para nombre de docente
    FaIdCard, // Icono para identificación/código
    FaEnvelope, // Icono para correo electrónico
    FaLock, // Icono para contraseña
    FaChalkboardTeacher, // Icono para título de docente
    FaSignOutAlt, // Icono para cerrar sesión
    FaSave // Icono para guardar
  } from 'react-icons/fa';
  
  // Componente principal para subir docentes
  const SubirDocente = () => {
      // Estado para manejar los datos del formulario
      const [formData, setFormData] = useState({
          nombre: '', // Nombre completo del docente
          codigo: '', // Código identificador
          correo: '', // Correo electrónico
          contrasena: '', // Contraseña
          identificacion: '' // Número de identificación
      });
  
      // Manejador de cambios en los campos del formulario
      const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({
              ...prev,
              [name]: value // Actualiza solo el campo modificado
          }));
      };
  
      // Manejador para el envío del formulario
      const handleSubmit = (e) => {
          e.preventDefault(); // Previene el comportamiento por defecto
          console.log('Datos del docente:', formData); // Log de datos (para desarrollo)
          alert('Docente registrado exitosamente'); // Feedback al usuario
          // Aquí iría la conexión con la API para guardar los datos
      };
  
      // Renderizado del componente
      return (
          <>
              {/* Barra de navegación superior */}
              <Navbar />
              
              {/* Contenedor principal con diseño flex y gradiente de fondo */}
              <div className="flex h-screen bg-gradient-to-br from-blue-50 to-gray-50">
                  {/* Menú lateral administrativo */}
                  <MenuLateral rol="admin" />
                  
                  {/* Contenido principal - Formulario */}
                  <div className="flex-1 p-6 overflow-auto">
                      {/* Tarjeta contenedora del formulario */}
                      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                          {/* Encabezado con icono y título */}
                          <div className="flex items-center mb-6">
                              <FaChalkboardTeacher className="text-blue-600 text-3xl mr-3" />
                              <div>
                                  <h2 className="text-2xl font-bold text-gray-800">SUBIR DOCENTE</h2>
                                  {/* Indicador de acceso */}
                                  <p className="text-green-500 text-sm flex items-center">
                                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                      Accesso completo
                                  </p>
                              </div>
                          </div>
                          
                          {/* Formulario principal */}
                          <form onSubmit={handleSubmit} className="space-y-5">
                              {/* Primera fila de campos (Nombre y Código) */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  {/* Campo Nombre */}
                                  <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                          <FaUserGraduate className="mr-2 text-blue-500" />
                                          Nombre:
                                      </label>
                                      <input
                                          type="text"
                                          name="nombre"
                                          value={formData.nombre}
                                          onChange={handleChange}
                                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                          required
                                          placeholder="Ingreso nombre completo"
                                      />
                                      {/* Icono dentro del input */}
                                      <FaUserGraduate className="absolute left-3 top-9 text-gray-400" />
                                  </div>
                                  
                                  {/* Campo Código */}
                                  <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                          <FaIdCard className="mr-2 text-blue-500" />
                                          Código:
                                      </label>
                                      <input
                                          type="text"
                                          name="codigo"
                                          value={formData.codigo}
                                          onChange={handleChange}
                                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                          placeholder="Código del docente"
                                      />
                                      <FaIdCard className="absolute left-3 top-9 text-gray-400" />
                                  </div>
                              </div>
                              
                              {/* Segunda fila de campos (Correo y Contraseña) */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  {/* Campo Correo */}
                                  <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                          <FaEnvelope className="mr-2 text-blue-500" />
                                          Correo:
                                      </label>
                                      <input
                                          type="email"
                                          name="correo"
                                          value={formData.correo}
                                          onChange={handleChange}
                                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                          required
                                          placeholder="ejemplo@institución.edu"
                                      />
                                      <FaEnvelope className="absolute left-3 top-9 text-gray-400" />
                                  </div>
                                  
                                  {/* Campo Contraseña */}
                                  <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                          <FaLock className="mr-2 text-blue-500" />
                                          Contraseña:
                                      </label>
                                      <input
                                          type="password"
                                          name="contrasena"
                                          value={formData.contrasena}
                                          onChange={handleChange}
                                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                          required
                                          placeholder="••••••••"
                                      />
                                      <FaLock className="absolute left-3 top-9 text-gray-400" />
                                  </div>
                              </div>
                              
                              {/* Tercer campo (Identificación - ocupa fila completa) */}
                              <div className="relative">
                                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                      <FaIdCard className="mr-2 text-blue-500" />
                                      Identificación:
                                  </label>
                                  <input
                                      type="text"
                                      name="identificacion"
                                      value={formData.identificacion}
                                      onChange={handleChange}
                                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                      placeholder="Numero de Identificación"
                                  />
                                  <FaIdCard className="absolute left-3 top-9 text-gray-400" />
                              </div>
                              
                              {/* Botones de acción */}
                              <div className="flex justify-between pt-5 border-t border-gray-200">
                                  {/* Botón Cerrar Sesión */}
                                  <button 
                                      type="button"
                                      className="px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition flex items-center"
                                  >
                                      <FaSignOutAlt className="mr-2" />
                                      Cerrar Sesión
                                  </button>
                                  
                                  {/* Botón Guardar/Sumar Docente */}
                                  <button 
                                      type="submit"
                                      className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center"
                                  >
                                      <FaSave className="mr-2" />
                                      Sumar Docente
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </>
      );
  };

export default SubirDocente;