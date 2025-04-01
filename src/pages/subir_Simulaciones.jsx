import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./SubirSimulaciones.css";
import MenuLateral from "../components/MenuAdmi_Doc"

import { 
    FaFileUpload,
    FaFilePdf,
    FaFileVideo,
    FaCalendarAlt,
    FaUserEdit,
    FaSignOutAlt
  } from 'react-icons/fa';
  
  const SubirSimulaciones = () => {
      const [formData, setFormData] = useState({
          nombre: '',
          descripcion: '',
          autores: '',
          fecha: '',
          archivos: []
      });
  
      const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({
              ...prev,
              [name]: value
          }));
      };
  
      const handleFileChange = (e) => {
          setFormData(prev => ({
              ...prev,
              archivos: [...e.target.files]
          }));
      };
  
      const handleSubmit = (e) => {
          e.preventDefault();
          console.log('Datos de la simulación:', formData);
          alert('Simulación enviada exitosamente');
      };
  
      return (
          <>
              <Navbar loggedIn={true} />
              <div className="flex h-screen bg-gray-50">
                  {/* Menú lateral */}
                  <MenuLateral rol="docente" />
                  
                  {/* Contenido principal */}
                  <div className="flex-1 p-6 overflow-auto">
                      <div className="max-w-4xl mx-auto">
                          {/* Encabezado */}
                          <div className="mb-6">
                              <h1 className="text-2xl font-bold text-gray-800">Panel Docente</h1>
                              <p className="text-green-500 text-sm">Accesos docente</p>
                          </div>
                          
                          {/* Formulario */}
                          <div className="bg-white p-6 rounded-lg shadow">
                              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">SUBIR SIMULACIONES</h2>
                              
                              <form onSubmit={handleSubmit} className="space-y-4">
                                  {/* Campo Nombre */}
                                  <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
                                      <input
                                          type="text"
                                          name="nombre"
                                          value={formData.nombre}
                                          onChange={handleChange}
                                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                          placeholder="Ingrese el nombre"
                                          required
                                      />
                                  </div>
                                  
                                  {/* Campo Descripción */}
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
                                      <textarea
                                          name="descripcion"
                                          value={formData.descripcion}
                                          onChange={handleChange}
                                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                          rows="3"
                                          placeholder="Descripción del proyecto"
                                      ></textarea>
                                  </div>
                                  
                                  {/* Campo Autores */}
                                  <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                          <FaUserEdit className="mr-2 text-blue-500" />
                                          Autores:
                                      </label>
                                      <input
                                          type="text"
                                          name="autores"
                                          value={formData.autores}
                                          onChange={handleChange}
                                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                          placeholder="Nombres de los autores"
                                      />
                                  </div>
                                  
                                  {/* Campo Fecha */}
                                  <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                          <FaCalendarAlt className="mr-2 text-blue-500" />
                                          Fecha de realización:
                                      </label>
                                      <input
                                          type="date"
                                          name="fecha"
                                          value={formData.fecha}
                                          onChange={handleChange}
                                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                      />
                                  </div>
                                  
                                  {/* Sección de archivos */}
                                  <div>
                                      <h3 className="text-sm font-medium text-gray-700 mb-3">Cargar archivos:</h3>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                          {/* Subir Simulación */}
                                          <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer">
                                              <FaFileUpload className="text-3xl text-blue-500 mb-2" />
                                              <span className="font-medium">SUBIR SIMULACIÓN</span>
                                              <input 
                                                  type="file" 
                                                  className="hidden" 
                                                  accept="*" 
                                                  onChange={handleFileChange}
                                              />
                                          </label>
                                          
                                          {/* Subir Documentos */}
                                          <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer">
                                              <FaFilePdf className="text-3xl text-red-500 mb-2" />
                                              <span className="font-medium">SUBIR DOCUMENTOS</span>
                                              <input 
                                                  type="file" 
                                                  className="hidden" 
                                                  accept=".pdf,.doc,.docx" 
                                                  multiple 
                                                  onChange={handleFileChange}
                                              />
                                          </label>
                                          
                                          {/* Subir Video */}
                                          <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer">
                                              <FaFileVideo className="text-3xl text-purple-500 mb-2" />
                                              <span className="font-medium">SUBIR VIDEO</span>
                                              <input 
                                                  type="file" 
                                                  className="hidden" 
                                                  accept=".mp4,.mov,.avi" 
                                                  onChange={handleFileChange}
                                              />
                                          </label>
                                      </div>
                                  </div>
                                  
                                  {/* Botones */}
                                  <div className="flex justify-between pt-6 border-t border-gray-200">
                                      
                                      <button 
                                          type="submit"
                                          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                      >
                                          Enviar
                                      </button>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </>
      );
  };
export default SubirSimulaciones;