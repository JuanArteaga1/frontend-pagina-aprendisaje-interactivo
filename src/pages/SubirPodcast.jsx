import React, { useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";

function SubirPodcast() {
  const [podcast, setPodcast] = useState({
    titulo: "",
    descripcion: "",
    autor: "",
    fecha: "",
    categoria: "",
  });

  const [archivos, setArchivos] = useState({
    audio: null,
    portada: null,
  });

  const handleChange = (e) => {
    setPodcast({ ...podcast, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, tipo) => {
    const file = e.target.files[0];
    if (file) {
      setArchivos({ ...archivos, [tipo]: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!podcast.titulo || !podcast.descripcion || !podcast.autor || !podcast.fecha || !podcast.categoria) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }
    console.log("Podcast enviado:", podcast);
    console.log("Archivos subidos:", archivos);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Menú Lateral Fijo */}
      <div className="fixed h-full w-64 bg-white shadow-lg z-10">
        <MenuLateral rol="docente" />
      </div>
      
      {/* Contenido Principal Desplazable */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Subir Nuevo Podcast
              </h2>
              <p className="text-gray-500">Comparte tu contenido auditivo con la comunidad</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              {/* Sección de información básica */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Título del Podcast</label>
                  <input
                    type="text"
                    name="titulo"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all placeholder-gray-400"
                    placeholder="Ej: La revolución de la inteligencia artificial"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Descripción</label>
                  <textarea
                    name="descripcion"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 h-40 transition-all placeholder-gray-400"
                    placeholder="Describe el contenido de tu podcast..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Autor</label>
                    <input
                      type="text"
                      name="autor"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all placeholder-gray-400"
                      placeholder="Nombre del autor"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Fecha de Publicación</label>
                    <input
                      type="date"
                      name="fecha"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Categoría</label>
                  <select
                    name="categoria"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all appearance-none"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="educacion">Educación</option>
                    <option value="entretenimiento">Entretenimiento</option>
                    <option value="negocios">Negocios</option>
                  </select>
                </div>
              </div>

              {/* Sección de archivos */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Cargar Archivos</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Subir Audio</label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-indigo-500 bg-gray-50 hover:bg-indigo-50 transition-colors group">
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "audio")}
                      />
                      <div className="text-4xl mb-3 text-gray-400 group-hover:text-indigo-500">
                        🎧
                      </div>
                      <p className="text-center text-sm text-gray-500">
                        {archivos.audio 
                          ? <span className="text-indigo-600 font-semibold">{archivos.audio.name}</span>
                          : "Haz clic para subir el archivo de audio"}
                      </p>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Subir Portada</label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-indigo-500 bg-gray-50 hover:bg-indigo-50 transition-colors group">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "portada")}
                      />
                      <div className="text-4xl mb-3 text-gray-400 group-hover:text-indigo-500">
                        🖼️
                      </div>
                      <p className="text-center text-sm text-gray-500">
                        {archivos.portada 
                          ? <span className="text-indigo-600 font-semibold">{archivos.portada.name}</span>
                          : "Haz clic para subir la imagen de portada"}
                      </p>
                    </label>
                  </div>

                  {archivos.portada && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Vista previa de la portada:</h4>
                      <img
                        src={URL.createObjectURL(archivos.portada)}
                        alt="Portada"
                        className="max-w-xs rounded-xl shadow-md border-2 border-gray-100"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-indigo-200/50"
              >
                Publicar Podcast
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubirPodcast;