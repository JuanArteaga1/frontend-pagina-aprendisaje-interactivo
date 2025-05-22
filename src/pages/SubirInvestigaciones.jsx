import React, { useEffect, useState } from "react";
import subirInvestigacionesImg from "../img/Subir_Investigaciones.jpg";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext"

import { ImageIcon, UploadIcon } from 'lucide-react';

import { useInvestigacion } from "../context/InvestigacionContext";

const SubirInvestigaciones = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { sigout, errors: InvestigacionErrors, mensaje } = useInvestigacion()
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const { Usuario, setUsuario } = useLogin()
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB




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
      <div className="flex-1 p-8 overflow-x-hidden overflow-auto">

        {/* Título FUERA del contenedor */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center ml-34">
          Subir Investigación
        </h2>

        {/* Contenedor del formulario */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-200">

          {/* Formulario */}
          {InvestigacionErrors.map((error, i) => (
            <Alerta key={i} tipo="error" mensaje={error.msg} />
          ))}
          {mensaje && (
            <Alerta tipo="exito" mensaje={mensaje} />

          )}
          <form onSubmit={handleSubmit(async (data) => {
            const formData = new FormData()
            formData.append("nombre_proyecto", data.nombre_proyecto);
            formData.append("descripcion", data.descripcion);
            formData.append("autores", data.autores);
            formData.append("fechaPublicacion", data.fecha);
            formData.append("materia", data.materia);
            formData.append("urlArticulo", data.UrlArticulo);
            formData.append("urlDoi", data.UrlDoi);
            formData.append("portada", data.portada[0]);
            formData.append("urlDoc", data.urlDoc[0]);
            formData.append("Usuario", Usuario.Id)
            formData.append("seccion", "Investigacion");
            console.log(formData)
            const resultado = await sigout(formData);
            if (resultado?.success) {
              setRegistroExitoso(true);
              // ✅ Limpiar campos
            }



          })} className="space-y-6">

            {/* Título */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">Título</label>
              <input
                {...register("nombre_proyecto", { required: "El título es obligatorio" })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Ingrese el título de la investigación"
              />
              {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
            </div>

            {/* Descripción */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">Descripción</label>
              <textarea
                {...register("descripcion", { required: "La descripción es obligatoria" })}
                rows="4"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Descripción detallada de la investigación"
              ></textarea>
              {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
            </div>

            {/* Autores y Fecha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                   Autores
                </label>
                <input
                  {...register("autores")}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Nombres de los autores"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                   Fecha
                </label>
                <input
                  type="datetime-local"
                  {...register("fecha")}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Materia */}
            <div>
              <label className="block text-3x1 font-semibold text-gray-800">Materia</label>
              <select
                {...register("materia", { required: "Debe seleccionar una materia" })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
              >
                <option value="">Seleccionar materia</option>
                <option value="Fisica">Fisica</option>
                <option value="ingenieria civil">Ingeniería Civil</option>
                <option value="Matematicas">Matematicas</option>
              </select>
              {errors.materia && <p className="text-red-500 text-sm">{errors.materia.message}</p>}
            </div>

            {/* URL Artículo */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                 URL del Artículo
              </label>
              <input
                type="url"
                {...register("UrlArticulo", { required: "Debe ingresar el enlace del artículo" })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="https://ejemplo.com/articulo"
              />
              {errors.UrlArticulo && <p className="text-red-500 text-sm">{errors.UrlArticulo.message}</p>}
            </div>

            {/* URL DOI */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                 URL DOI
              </label>
              <input
                type="url"
                {...register("UrlDoi", { required: "Debe ingresar la URL del DOI" })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="https://doi.org/xxxxx"
              />
              {errors.UrlDoi && <p className="text-red-500 text-sm">{errors.UrlDoi.message}</p>}
            </div>

            {/* Subir Archivos */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-3">Subir archivos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                  <ImageIcon className="w-10 h-10 text-black opacity-50" />
                  <span className="font-medium">Imagen de la portada</span>
                  <span className="text-xs text-gray-500">(JPG, PNG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register('portada', {
                      required: 'Se requiere una imagen',
                      validate: {
                        tamaño: (archivos) =>
                          archivos[0]?.size <= MAX_SIZE || 'La imagen supera los 10MB',
                      },
                    })}

                  />
                </label>

                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                  <UploadIcon className="w-10 h-10 text-black opacity-50" />
                  <span className="font-medium">Documento PDF</span>
                  <span className="text-xs text-gray-500">(Artículo completo)</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    {...register('urlDoc', {
                      required: 'Se requiere una Documento',
                      validar: {
                        tamaño: (archivos) => archivos[0]?.size <= MAX_SIZE || 'Audio supera los 10MB',
                      },

                    })}
                  />
                </label>
              </div>
            </div>

            {/* Botón */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="w-50 bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-indigo-200/50"
              >
                Subir investigación
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SubirInvestigaciones;
