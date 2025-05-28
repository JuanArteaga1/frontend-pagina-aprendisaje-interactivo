import React, { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm, useFieldArray } from "react-hook-form";
import { useProyectos } from "../context/ProyectoContext";
import { UseCategoria } from "../context/CategoriaContext";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext";
import { Image, Upload, FileUp } from "lucide-react";

function SubirProyecto() {
  const { register, handleSubmit, watch, formState: { errors }, reset, control } = useForm();
  const { sigout, Proyectos, errors: ProyectosErrors, mensaje, setMensaje, setErrors } = useProyectos();
  const { TraerCategoria, Categoria } = UseCategoria();
  const { Usuario } = useLogin();
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const { fields, append, remove } = useFieldArray({
    control,
    name: "autores",
  });

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
            const autoresFormateados = data.autores.map(a => a.nombre).join(", ");
            formData.append("autores", autoresFormateados);
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
              reset(); // Limpiar campos
            }
          })}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-3x1 font-semibold text-gray-800 mb-1">Nombre del proyecto</label>
                <input
                  {...register('nombre_proyecto', { required: true })}
                  type="text"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-1"
                />
                {errors.nombre_proyecto && <p className="text-red-500 font-semibold text-sm">El nombre es requerido</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-3x1 font-semibold text-gray-800">Autores</label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex space-x-2 items-center">
                    <input
                      type="text"
                      {...register(`autores.${index}.nombre`, { required: "El nombre del autor es obligatorio" })}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl"
                      placeholder={`Autor #${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 font-bold text-xl"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ nombre: "" })}
                  className="mt-2 text-sm text-blue-600 font-semibold hover:underline"
                >
                  + Agregar autor
                </button>
                {errors.autores && <p className="text-red-500 font-semibold text-sm">{errors.autores.message}</p>}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Fecha de realización</label>
                <input
                  {...register('fechaPublicacion', { required: true })}
                  type="datetime-local"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                />
                {errors.fechaPublicacion && <p className="text-red-500 font-semibold text-sm">La fecha es requerida</p>}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Categoría</label>
                <select
                  {...register('categoriaId', { required: true })}
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                >
                  <option value="">Seleccionar categoría</option>
                  {Categoria?.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.Nombre_Categoria}
                    </option>
                  ))}
                </select>
                {errors.categoriaId && <p className="text-red-500 font-semibold text-sm">Categoría es requerida</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-semibold text-gray-800 mb-1">Descripción</label>
                <textarea
                  {...register('descripcion', { required: true })}
                  rows="4"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                />
                {errors.descripcion && <p className="text-red-500 font-semibold text-sm">Descripción es requerida</p>}
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-800 mb-1">Materia</label>
              <select
                {...register('materia', { required: true })}
                className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
              >
                <option value="">Seleccionar materia</option>
                <option value="Fisica">Física</option>
                <option value="ingenieria civil">Ingeniería Civil</option>
                <option value="Matematicas">Matemáticas</option>
              </select>
              {errors.materia && <p className="text-red-500 font-semibold text-sm">Materia es requerida</p>}
            </div>

            {/* Archivos */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-800">Cargar Archivos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

                {/* APK */}
                <label className="upload-label">
                  <input
                    type="file"
                    className="hidden"
                    accept=".apk"
                    {...register('urlArchivoapk', {
                      required: 'Se requiere una APK',
                      validate: {
                        tamaño: (archivos) => archivos?.[0]?.size <= MAX_SIZE || 'El archivo supera los 10MB',
                        tipo: (archivos) => archivos?.[0]?.name.toLowerCase().endsWith('.apk') || 'Debe ser .apk',
                      },
                    })}
                  />
                  {archivoAPK?.[0] ? (
                    <span className="file-name">{archivoAPK[0].name}</span>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-black" />
                      <span className="text-sm text-gray-600 mt-1">Subir APK</span>
                    </>
                  )}
                  {errors.urlArchivoapk && <p className="text-red-500 text-center text-sm">{errors.urlArchivoapk.message}</p>}
                </label>

                {/* Imagen */}
                <label className="upload-label">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register('portada', {
                      required: 'Se requiere una imagen',
                      validate: {
                        tamaño: (archivos) => archivos?.[0]?.size <= MAX_SIZE || 'Imagen muy pesada',
                        tipo: (archivos) => /\.(jpg|jpeg|png|webp)$/i.test(archivos?.[0]?.name) || 'Debe ser .jpg/.png',
                      },
                    })}
                  />
                  {portada?.[0] ? (
                    <span className="file-name">{portada[0].name}</span>
                  ) : (
                    <>
                      <Image className="w-5 h-5 text-black" />
                      <span className="text-sm text-gray-600 mt-1">Subir IMG</span>
                    </>
                  )}
                  {errors.portada && <p className="text-red-500 text-center text-sm">{errors.portada.message}</p>}
                </label>

                {/* PDF */}
                <label className="upload-label">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    {...register('urlDoc', {
                      required: 'Se requiere un documento',
                      validate: {
                        tamaño: (archivos) => archivos?.[0]?.size <= MAX_SIZE || 'Documento muy pesado',
                        tipo: (archivos) => archivos?.[0]?.name.toLowerCase().endsWith('.pdf') || 'Debe ser PDF',
                      },
                    })}
                  />
                  {urlDoc?.[0] ? (
                    <span className="file-name">{urlDoc[0].name}</span>
                  ) : (
                    <>
                      <FileUp className="w-5 h-5 text-black" />
                      <span className="text-sm text-gray-600 mt-1">Subir PDF</span>
                    </>
                  )}
                  {errors.urlDoc && <p className="text-red-500 text-center text-sm">{errors.urlDoc.message}</p>}
                </label>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-50 bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-4 px-6 
                  rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none 
                  focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg
                  hover:shadow-indigo-200/50">
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
