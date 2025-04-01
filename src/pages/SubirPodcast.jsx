import React, { useState } from "react";

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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Subir Nuevo Podcast
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sección de Información Básica */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
              Información del Podcast
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Título del Podcast
                </label>
                <input
                  type="text"
                  name="titulo"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Autor
                  </label>
                  <input
                    type="text"
                    name="autor"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Fecha de Publicación
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Categoría
                </label>
                <select
                  name="categoria"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="educacion">Educación</option>
                  <option value="entretenimiento">Entretenimiento</option>
                  <option value="negocios">Negocios</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección de Archivos */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
              Archivos Multimedia
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100">
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "audio")}
                />
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
                <span className="text-gray-600 font-medium">
                  {archivos.audio ? archivos.audio.name : "Subir Audio (.mp3, .wav)"}
                </span>
              </label>

              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "portada")}
                />
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span className="text-gray-600 font-medium">
                  {archivos.portada ? archivos.portada.name : "Subir Portada (.jpg, .png)"}
                </span>
              </label>
            </div>

            {archivos.portada && (
              <div className="mt-4 flex justify-center">
                <img
                  src={URL.createObjectURL(archivos.portada)}
                  alt="Portada del Podcast"
                  className="w-32 h-32 object-cover rounded-lg shadow-md border border-gray-200"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-[1.01] shadow-md"
          >
            Publicar Podcast
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubirPodcast;
