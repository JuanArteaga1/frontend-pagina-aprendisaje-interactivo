import React, { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import { useProyectos } from "../context/ProyectoContext";
import { UseCategoria } from "../context/CategoriaContext";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext";
import { Image, Upload, FileUp } from "lucide-react";

function SubirProyecto() {

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: { autores: [""] } // ← inicia con un autor vacío
  });

  const { sigout, Proyectos, errors: ProyectosErrors, mensaje, setMensaje, setErrors } = useProyectos();
  const { TraerCategoria, Categoria } = UseCategoria();
  const { Usuario } = useLogin();
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const archivoAPK = watch('urlArchivoapk');
  const portada = watch('portada');
  const urlDoc = watch('urlDoc');

  useEffect(() => {
    TraerCategoria();
  }, []);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setRegistroExitoso(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  useEffect(() => {
    if (ProyectosErrors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 3000);
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

          <form
            onSubmit={handleSubmit(async (data) => {
              const formData = new FormData();
              formData.append("nombre_proyecto", data.nombre_proyecto);
              formData.append("autores", JSON.stringify(data.autores)); // ahora es array
              formData.append("fechaPublicacion", data.fechaPublicacion);
              formData.append("descripcion", data.descripcion);
              formData.append("materia", data.materia);
              formData.append("youtubeLink", data.youtubeLink || "");
              formData.append("categoriaId", data.categoriaId);
              formData.append("urlArchivoapk", data.urlArchivoapk[0]);
              formData.append("portada", data.portada[0]);
              formData.append("urlDoc", data.urlDoc[0]);
              formData.append("Usuario", Usuario.Id);
              formData.append("seccion", "Proyectos");

              const resultado = await sigout(formData);
              if (resultado?.success) setRegistroExitoso(true);
            })}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-3x1 font-semibold text-gray-800 mb-1">Nombre del proyecto</label>
                <input
                  {...register('nombre_proyecto', { required: true })}
                  type="text"
                  name="nombre_proyecto"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-1"
                />
                {errors.nombre_proyecto && (<p className="text-red-500 font-semibold text-sm">El nombre es requerido</p>)}
              </div>

              {/* Autores dinámicos con opción de quitar */}
              <div>
                <label className="block text-3x1 font-semibold text-gray-800 mb-1">Autores</label>
                {watch('autores')?.map((_, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      {...register(`autores.${index}`, { required: true })}
                      type="text"
                      placeholder={`Autor ${index + 1}`}
                      className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-1"
                    />
                    {watch('autores').length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const currentAutores = [...watch('autores')];
                          currentAutores.splice(index, 1);
                          reset({ ...watch(), autores: currentAutores });
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const currentAutores = watch('autores') || [];
                    reset({ ...watch(), autores: [...currentAutores, ""] });
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                >
                  +
                </button>
                {errors.autores && (
                  <p className="text-red-500 font-semibold text-sm">Se requiere al menos un autor</p>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Fecha de realización</label>
                <input
                  {...register('fechaPublicacion', { required: true })}
                  type="datetime-local"
                  name="fechaPublicacion"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                />
                {errors.fechaPublicacion && (<p className="text-red-500 font-semibold text-sm">La fecha es requerida</p>)}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Categoría</label>
                <select
                  {...register('categoriaId', { required: true })}
                  name="categoriaId"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                >
                  <option value="">Seleccionar categoría</option>
                  {Categoria && Categoria.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.Nombre_Categoria}
                    </option>
                  ))}
                </select>
                {errors.categoriaId && (<p className="text-red-500 font-semibold text-sm">Categoria es requerida</p>)}
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-semibold text-gray-800 mb-1">Descripción</label>
                <textarea
                  {...register('descripcion', { required: true })}
                  name="descripcion"
                  rows="4"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                />
                {errors.descripcion && (<p className="text-red-500 font-semibold text-sm">Descripcion es requerida</p>)}
              </div>
            </div>

            {/* Materia */}
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-1">Materia</label>
              <select
                {...register('materia', { required: true })}
                name="materia"
                className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              >
                <option value="">Seleccionar materia</option>
                <option value="Fisica">Fisica</option>
                <option value="ingenieria civil">Ingeniería Civil</option>
                <option value="Matematicas">Matematicas</option>
              </select>
              {errors.materia && (<p className="text-red-500 font-semibold text-sm">Materia es requerida</p>)}
            </div>

            {/* Link YouTube */}
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-1">Link de YouTube</label>
              <input
                {...register('youtubeLink', {
                  validate: (value) => {
                    if (!value) return true;
                    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(value) || 'Ingrese un enlace válido de YouTube';
                  }
                })}
                type="url"
                name="youtubeLink"
                placeholder="https://www.youtube.com"
                className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
              {errors.youtubeLink && (
                <p className="text-red-500 font-semibold text-sm">{errors.youtubeLink.message}</p>
              )}
            </div>

            {/* Archivos */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-800">Cargar Archivos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {/* APK */}
                <label className="flex flex-col items-center justify-center w-full max-w-[220px] aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept=".apk"
                    {...register('urlArchivoapk', {
                      required: 'Se requiere una APK',
                      validate: {
                        tamaño: (archivos) => archivos[0]?.size <= MAX_SIZE || 'El archivo supera los 10MB',
                        tipo: (archivos) => archivos?.[0]?.name.toLowerCase().endsWith('.apk') || 'El archivo debe ser .apk',
                      },
                    })}
                  />
                  {archivoAPK?.[0] && <span className="text-center text-sm text-gray-700 mt-1">{archivoAPK[0].name}</span>}
                  {archivoAPK?.length > 0 && !errors.urlArchivoapk && (<p className="text-green-500 text-center font-semibold text-sm">APK subida correctamente</p>)}
                  {errors.urlArchivoapk && (<p className="text-red-500 text-center font-semibold text-sm">{errors.urlArchivoapk.message}</p>)}
                  {!archivoAPK?.[0] && <Upload className="w-5 h-5 text-black" />}
                  {!archivoAPK?.[0] && <span className="text-sm text-gray-600 mt-1">Subir APK</span>}
                </label>

                {/* Imagen */}
                <label className="flex flex-col items-center justify-center w-full max-w-[220px] aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register('portada', {
                      required: 'Se requiere una imagen',
                      validate: {
                        tamaño: (archivos) => archivos?.[0]?.size <= MAX_SIZE || 'La imagen supera los 10MB',
                        tipo: (archivos) => /\.(jpg|jpeg|png|webp)$/i.test(archivos?.[0]?.name) || 'El archivo debe ser una imagen (.jpg, .jpeg, .png, .webp)',
                      },
                    })}
                  />
                  {portada?.[0] && (
                    <span className="text-sm text-center text-gray-700 mt-1 break-words w-full px-2 max-w-[220px]">{portada[0].name}</span>
                  )}
                  {portada?.length > 0 && !errors.portada && (<p className="text-green-500 text-center font-semibold text-sm">Imagen subida correctamente</p>)}
                  {errors.portada && (<p className="text-red-500 text-center font-semibold text-sm">{errors.portada.message}</p>)}
                  {!portada?.[0] && <Image className="w-5 h-5 text-black" />}
                  {!portada?.[0] && <span className="text-sm text-gray-600 mt-1">Subir IMG</span>}
                </label>

                {/* Documento */}
                <label className="flex flex-col items-center justify-center w-full max-w-[220px] aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    {...register('urlDoc', {
                      required: 'Se requiere un documento',
                      validate: {
                        tamaño: (archivos) => archivos?.[0]?.size <= MAX_SIZE || 'El documento es muy pesado',
                        tipo: (archivos) => archivos?.[0]?.name?.toLowerCase().endsWith('.pdf') || 'El archivo debe ser un PDF',
                      },
                    })}
                  />
                  {urlDoc?.[0] && (
                    <span className="text-sm text-center text-gray-700 mt-1 break-words w-full px-2 max-w-[220px]">{urlDoc[0].name}</span>
                  )}
                  {urlDoc?.length > 0 && !errors.urlDoc && (<p className="text-green-500 text-center font-semibold text-sm">Documento subido correctamente</p>)}
                  {errors.urlDoc && (<p className="text-red-500 text-center font-semibold text-sm">{errors.urlDoc.message}</p>)}
                  {!urlDoc?.[0] && <FileUp className="w-5 h-5 text-black" />}
                  {!urlDoc?.[0] && <span className="text-sm text-gray-600 mt-1">Subir PDF</span>}
                </label>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-50 bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-indigo-200/50"
                >
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