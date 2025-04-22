import React from "react";
import subirInvestigacionesImg from "../img/Subir_Investigaciones.jpg";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import {
  FaFileUpload,
  FaFilePdf,
  FaImage,
  FaCalendarAlt,
  FaUserEdit,
  FaPaperclip,
  FaLink,
} from "react-icons/fa";

const SubirInvestigaciones = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Datos de la investigación:", data);
    alert("Investigación subida correctamente");
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      setValue(name, file);  // react-hook-form controla el archivo
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú Lateral */}
      <MenuLateral rol="docente" />

      {/* Contenido principal */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
            SUBIR INVESTIGACIÓN
          </h2>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Título */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Título:</label>
              <input
                {...register("titulo", { required: "El título es obligatorio" })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Ingrese el título de la investigación"
              />
              {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
            </div>

            {/* Descripción */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Descripción:</label>
              <textarea
                {...register("descripcion", { required: "La descripción es obligatoria" })}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Descripción detallada de la investigación"
              ></textarea>
              {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
            </div>

            {/* Autores y Fecha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                  <FaUserEdit className="text-blue-500" /> Autores:
                </label>
                <input
                  {...register("autores")}
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
                  {...register("fecha")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Materia */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Materia</label>
              <select
                {...register("materia", { required: "Debe seleccionar una materia" })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
              >
                <option value="">Seleccionar materia</option>
                <option value="fisica">Física</option>
                <option value="ingenieria_civil">Ingeniería Civil</option>
                <option value="matematicas">Matemáticas</option>
              </select>
              {errors.materia && <p className="text-red-500 text-sm">{errors.materia.message}</p>}
            </div>

            {/* URL Artículo */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <FaLink className="text-green-500" /> URL del Artículo:
              </label>
              <input
                type="url"
                {...register("UrlArticulo", { required: "Debe ingresar el enlace del artículo" })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="https://ejemplo.com/articulo"
              />
              {errors.UrlArticulo && <p className="text-red-500 text-sm">{errors.UrlArticulo.message}</p>}
            </div>

            {/* URL DOI */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <FaLink className="text-green-500" /> URL DOI:
              </label>
              <input
                type="url"
                {...register("UrlDoi", { required: "Debe ingresar la URL del DOI" })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="https://doi.org/xxxxx"
              />
              {errors.UrlDoi && <p className="text-red-500 text-sm">{errors.UrlDoi.message}</p>}
            </div>

            {/* Subir Archivos */}
            <div>
              <h3 className="text-gray-700 font-medium mb-3">Subir archivos:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                  <FaImage className="text-4xl text-blue-500 mb-2" />
                  <span className="font-medium">IMAGEN DE PORTADA</span>
                  <span className="text-xs text-gray-500">(JPG, PNG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "imagen")}
                  />
                </label>

                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                  <FaFilePdf className="text-4xl text-red-500 mb-2" />
                  <span className="font-medium">DOCUMENTO PDF</span>
                  <span className="text-xs text-gray-500">(Artículo completo)</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "archivo")}
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
  );
};

export default SubirInvestigaciones;
