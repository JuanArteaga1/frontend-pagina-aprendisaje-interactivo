import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MenuLateral from "../components/MenuAdmi_Doc";

function SubirProyecto() {
  const [proyecto, setProyecto] = useState({
    nombre: "",
    descripcion: "",
    autores: "",
    fecha: "",
    categoria: "",
  });

  const [archivos, setArchivos] = useState({
    apk: null,
    documentos: null,
    avance: null,
    imagenes: [],
  });

  const handleChange = (e) => {
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, tipo) => {
    const files = e.target.files;
    if (files.length > 0) {
      if (tipo === "imagenes") {
        setArchivos({
          ...archivos,
          imagenes: [...archivos.imagenes, files[0]],
        });
      } else {
        setArchivos({
          ...archivos,
          [tipo]: files[0],
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !proyecto.nombre ||
      !proyecto.descripcion ||
      !proyecto.autores ||
      !proyecto.fecha ||
      !proyecto.categoria
    ) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }
    console.log("Proyecto enviado:", proyecto);
    console.log("Archivos subidos:", archivos);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar loggedIn={true} />
      <div className="flex flex-1 bg-gray-100">
        <MenuLateral rol="docente" />

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Subir Proyecto</h2>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del proyecto</label>
                  <input
                    type="text"
                    name="nombre"
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Autores</label>
                  <input
                    type="text"
                    name="autores"
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de realización</label>
                  <input
                    type="date"
                    name="fecha"
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    name="categoria"
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="software">Física</option>
                    <option value="hardware">Cálculo</option>
                    <option value="investigacion">Investigación</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    name="descripcion"
                    onChange={handleChange}
                    required
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Cargar Archivos</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input type="file" onChange={(e) => handleFileUpload(e, "apk")} className="hidden" />
                    <span className="text-3xl">🪷</span>
                    <span className="text-sm text-gray-600 mt-1">Subir imagen</span>
                  </label>

                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input type="file" onChange={(e) => handleFileUpload(e, "avance")} className="hidden" />
                    <span className="text-3xl">📈</span>
                    <span className="text-sm text-gray-600 mt-1">Investigación</span>
                  </label>

                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input type="file" onChange={(e) => handleFileUpload(e, "imagenes")} className="hidden" />
                    <span className="text-3xl">📄</span>
                    <span className="text-sm text-gray-600 mt-1">Artículo</span>
                  </label>
                </div>

                {archivos.imagenes.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Vista previa de archivos:</h4>
                    <div className="flex flex-wrap gap-4">
                      {archivos.imagenes.map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Imagen ${index + 1}`}
                          className="max-w-xs h-32 object-cover rounded-lg shadow-sm"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Publicar Proyecto
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SubirProyecto;