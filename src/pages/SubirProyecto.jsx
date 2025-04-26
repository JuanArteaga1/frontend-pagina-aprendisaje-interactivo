import React, { useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form"
import { UseProyectos } from "../context/ProyectoContext"
import Alerta from "../components/AlertasDocente";

function SubirProyecto() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { sigout, Proyectos, errors: ProyectosErrors, mensaje } = UseProyectos()
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú Lateral */}
      <MenuLateral rol="docente" />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Subir Proyecto</h2>

          {ProyectosErrors.map((error, i) => (
            <Alerta key={i} tipo="error" mensaje={error.msg} />
          ))}
          {mensaje && (
            <Alerta tipo="exito" mensaje={mensaje} />

          )}

          <form onSubmit={handleSubmit(async (data) => {
            console.log(data)
            const formData = new FormData()
            formData.append("nombre_proyecto", data.nombre_proyecto);
            formData.append("autores", data.autores); // cambiar "autor" → "autores"
            formData.append("fechaPublicacion", data.fechaPublicacion); // cambiar "fecha" → "fechaPublicacion"
            formData.append("descripcion", data.descripcion);
            formData.append("materia", data.materia);
            formData.append("categoriaId", data.categoriaId);
            formData.append("urlArchivoapk", data.urlArchivoapk[0]); // cambiar "audioLink" → "UrlAudio"
            formData.append("portada", data.portada[0]);
            formData.append("urlDoc", data.urlDoc[0]);


            formData.append("seccion", "Proyectos");

            const resultado = await sigout(formData);
            if (resultado?.success) {
              setRegistroExitoso(true);
              // ✅ Limpiar campos
            }
          })}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-3x1 font-semibold text-gray-800 mb-1">Nombre del proyecto</label>
                <input
                  {...register('nombre_proyecto', { required: true })}
                  type="text"
                  name="nombre_proyecto"
                  required
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-1"
                />
                {errors.nombre_proyecto && (<p className="text-red-500">Nombre es requerido</p>)}
              </div>

              <div>
                <label className="block text-3x1 font-semibold text-gray-800 mb-1">Autores</label>
                <input
                  {...register('autores', { required: true })}
                  type="text"
                  name="autores"
                  required
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-1"
                />
                {errors.autores && (<p className="text-red-500">Autor es requerido</p>)}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Fecha de realización</label>
                <input
                  {...register('fechaPublicacion', { required: true })}
                  type="date"
                  name="fechaPublicacion"
                  required
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                />
                {errors.fechaPublicacion && (<p className="text-red-500">La fecha es requerida</p>)}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Categoría</label>
                <select
                  {...register('categoriaId', { required: true })}
                  name="categoriaId"
                  required
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="software">Física</option>
                  <option value="hardware">Cálculo</option>
                  <option value="investigacion">Investigación</option>
                </select>
                {errors.categoriaId && (<p className="text-red-500">Categoria es requerida</p>)}
              </div>

              <div className="md:col-span-2">
                <label className="block text-base  font-semibold text-gray-800 mb-1">Descripción</label>
                <textarea
                  {...register('descripcion', { required: true })}
                  name="descripcion"
                  required
                  rows="4"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                />
                {errors.descripcion && (<p className="text-red-500">Descripcion es requerida</p>)}
              </div>
            </div>

            {/* 🔧 Campo Materia (nuevo y funcional) */}
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-1">Materia</label>
              <select
                {...register('materia', { required: true })}
                name="materia"
                required
                className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2">
                <option value="">Seleccionar materia</option>
                <option value="fisica">Física</option>
                <option value="ingenieria_civil">Ingeniería Civil</option>
                <option value="matematicas">Matemáticas</option>
              </select>
              {errors.materia && (<p className="text-red-500">Materia es requerida</p>)}
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-800">Cargar Archivos</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept=".mp3,audio/*"
                    {...register('urlArchivoapk', {
                      required: 'Se requiere una imagen',
                      validar: {
                        tamaño: (archivos) => archivos[0]?.size <= MAX_SIZE || 'Audio supera los 10MB',
                      },

                    })}
                  />
                  {errors.urlArchivoapk && (<p className="text-red-500">apk es requerida</p>)}
                  <span className="text-3xl">🪷</span>
                  <span className="text-sm text-gray-600 mt-1">Subir APK</span>
                </label>



                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register('portada', {
                      required: 'Se requiere una imagen',
                      validate: {
                        tamaño: (archivos) =>
                          archivos[0]?.size <= MAX_SIZE || 'La imagen supera los 10MB',
                      },
                    })}
                  />
                  {errors.portada && (<p className="text-red-500">Imagen es requerida</p>)}


                  <span className="text-3xl">📈</span>
                  <span className="text-sm text-gray-600 mt-1">Subir IMG</span>
                </label>
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input type="file" className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    {...register('urlDoc', {
                      required: 'Se requiere una Documento',
                      validar: {
                        tamaño: (archivos) => archivos[0]?.size <= MAX_SIZE || 'Audio supera los 10MB',
                      },

                    })} />
                  {errors.urlDoc && (<p className="text-red-500">Documento es requerida</p>)}

                  <span className="text-3xl">📄</span>
                  <span className="text-sm text-gray-600 mt-1">Subir PDF</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full font-semibold  bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Publicar Proyecto
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SubirProyecto;