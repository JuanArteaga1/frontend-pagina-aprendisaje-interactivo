import React, { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import { useProyectos } from "../context/ProyectoContext";
import { UseCategoria } from "../context/CategoriaContext";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext";
import { Image, Upload, FileUp } from "lucide-react";

function SubirProyecto() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const { sigout, Proyectos, errors: ProyectosErrors, mensaje, setMensaje, setErrors } = useProyectos();
  const { TraerCategoria, Categoria } = UseCategoria();
  const { Usuario, setUsuario } = useLogin();
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [autores, setAutores] = useState([""]);
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const archivoAPK = watch('urlArchivoapk');
  const portada = watch('portada');
  const urlDoc = watch('urlDoc');

  useEffect(() => {
    TraerCategoria();
  }, []);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setRegistroExitoso(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  useEffect(() => {
    if (ProyectosErrors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [ProyectosErrors]);

  return (
    <div className="flex h-screen bg-gray-100">
      {mensaje && (
        <div className="fixed top-5 right-5 z-50">
          <Alerta tipo="exito" mensaje={mensaje} onClose={() => setMensaje(null)} />
        </div>
      )}

      {ProyectosErrors.length > 0 && (
        <div className="fixed top-20 right-5 z-50 space-y-2">
          {ProyectosErrors.map((error, i) => (
            <Alerta key={i} tipo="error" mensaje={error.msg} />
          ))}
        </div>
      )}

      <MenuLateral rol="docente" />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Subir Proyecto</h2>

          <form onSubmit={handleSubmit(async (data) => {
            const formData = new FormData();
            formData.append("nombre_proyecto", data.nombre_proyecto);
            formData.append("autores", autores.join(", "));
            formData.append("fechaPublicacion", data.fechaPublicacion);
            formData.append("descripcion", data.descripcion);
            formData.append("materia", data.materia);
            formData.append("categoriaId", data.categoriaId);
            formData.append("urlArchivoapk", data.urlArchivoapk[0]);
            formData.append("portada", data.portada[0]);
            formData.append("urlDoc", data.urlDoc[0]);
            formData.append("Usuario", Usuario.Id);
            formData.append("seccion", "Proyectos");

            const resultado = await sigout(formData);
            if (resultado?.success) {
              setRegistroExitoso(true);
              reset();
              setAutores([""]);
            }
          })}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-3x1 font-semibold text-gray-800 mb-1">Nombre del proyecto</label>
                <input
                  {...register('nombre_proyecto', { required: true })}
                  type="text"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-1"
                />
                {errors.nombre_proyecto && (<p className="text-red-500 font-semibold text-sm">El nombre es requerido</p>)}
              </div>

              {/* Campo de Autores dinámico */}
              <div>
                <label className="block text-3x1 font-semibold text-gray-800 mb-1">Autores</label>
                {autores.map((autor, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={autor}
                      onChange={(e) => {
                        const nuevosAutores = [...autores];
                        nuevosAutores[index] = e.target.value;
                        setAutores(nuevosAutores);
                      }}
                      className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-1"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const nuevosAutores = autores.filter((_, i) => i !== index);
                          setAutores(nuevosAutores);
                        }}
                        className="ml-2 text-red-500 font-bold"
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setAutores([...autores, ""])}
                  className="text-blue-500 hover:underline text-sm"
                >
                  + Agregar autor
                </button>
                {autores.length === 0 || autores.some(a => a.trim() === "") ? (
                  <p className="text-red-500 font-semibold text-sm">Se requiere al menos un autor</p>
                ) : null}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Fecha de realización</label>
                <input
                  {...register('fechaPublicacion', { required: true })}
                  type="datetime-local"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                />
                {errors.fechaPublicacion && (<p className="text-red-500 font-semibold text-sm">La fecha es requerida</p>)}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Categoría</label>
                <select
                  {...register('categoriaId', { required: true })}
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                >
                  <option value="">Seleccionar categoría</option>
                  {Categoria && Categoria.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.Nombre_Categoria}
                    </option>
                  ))}
                </select>
                {errors.categoriaId && (
                  <p className="text-red-500 font-semibold text-sm">Categoria es requerida</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-semibold text-gray-800 mb-1">Descripción</label>
                <textarea
                  {...register('descripcion', { required: true })}
                  rows="4"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                />
                {errors.descripcion && (<p className="text-red-500 font-semibold text-sm">Descripción es requerida</p>)}
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-800 mb-1">Materia</label>
              <select
                {...register('materia', { required: true })}
                className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2">
                <option value="">Seleccionar materia</option>
                <option value="Fisica">Física</option>
                <option value="ingenieria civil">Ingeniería Civil</option>
                <option value="Matematicas">Matemáticas</option>
              </select>
              {errors.materia && (<p className="text-red-500 font-semibold text-sm">Materia es requerida</p>)}
            </div>

            {/* Archivos */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-800">Cargar Archivos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {/* Subir APK */}
                <label className="upload-label">{/* ...contenido original... */}</label>

                {/* Subir Imagen */}
                <label className="upload-label">{/* ...contenido original... */}</label>

                {/* Subir PDF */}
                <label className="upload-label">{/* ...contenido original... */}</label>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-50 bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-indigo-200/50">
                  Subir proyecto
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SubirProyecto;