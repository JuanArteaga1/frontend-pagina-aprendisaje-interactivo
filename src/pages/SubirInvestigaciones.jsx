import React, { useState } from "react";
import subirInvestigacionesImg from "../img/Subir_Investigaciones.jpg";
import MenuLateral from "../components/MenuAdmi_Doc";
import {
  FaFileUpload,
  FaFilePdf,
  FaImage,
  FaCalendarAlt,
  FaUserEdit,
  FaPaperclip,
} from "react-icons/fa";

const SubirInvestigaciones = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    autores: "",
    fecha: "",
    imagen: null,
    archivo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de la investigación:", formData);
    alert("Investigación subida correctamente");
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Menú Lateral */}
        <MenuLateral rol="docente" />

        {/* Contenedor principal */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
              SUBIR INVESTIGACIÓN
            </h2>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Título:</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Ingrese el título de la investigación"
                  required
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Descripción:</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Descripción detallada de la investigación"
                  required
                ></textarea>
              </div>

              {/* Autores y Fecha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <FaUserEdit className="text-blue-500" /> Autores:
                  </label>
                  <input
                    type="text"
                    name="autores"
                    value={formData.autores}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Nombres de los autores"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <FaCalendarAlt className="text-blue-500" /> Fecha:
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>

              {/* Archivos */}
              <div>
                <h3 className="text-gray-700 font-medium mb-3">Subir archivos:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                    <FaImage className="text-4xl text-blue-500 mb-2" />
                    <span className="font-medium">IMAGEN DE PORTADA</span>
                    <span className="text-xs text-gray-500">(JPG, PNG)</span>
                    <input
                      type="file"
                      name="imagen"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                    <FaFilePdf className="text-4xl text-red-500 mb-2" />
                    <span className="font-medium">DOCUMENTO PDF</span>
                    <span className="text-xs text-gray-500">(Artículo completo)</span>
                    <input
                      type="file"
                      name="archivo"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Botón */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaPaperclip /> Subir Investigación
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubirInvestigaciones;