import React, { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import { usePodcast } from "../context/PodcastContext";
import { UseCategoria } from "../context/CategoriaContext"
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext"
import { ImageIcon } from 'lucide-react';


function SubirPodcast() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { sigout, errors: PodcastErros, mensaje } = usePodcast(); // Si tienes esta función en contexto
  const portadaPreview = watch("portada")?.[0];
  const { TraerCategoria, Categoria } = UseCategoria()
  const [setRegistroExitoso] = useState(false);
  const { Usuario, setUsuario } = useLogin()
  const portada = watch('portada');
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  useEffect(() => {
    TraerCategoria();
    console.log(Categoria) // Llamada inicial para traer los datos
  }, []);


  const onSubmit = async (data) => {
    const formData = new FormData();
    // Agregar datos del formulario
    formData.append("nombre_proyecto", data.nombre_proyecto);
    formData.append("descripcion", data.descripcion);
    formData.append("autores", data.autores); // cambiar "autor" → "autores"
    formData.append("fechaPublicacion", data.fecha); // cambiar "fecha" → "fechaPublicacion"
    formData.append("materia", data.materia);
    formData.append("UrlAudio", data.audioLink); // cambiar "audioLink" → "UrlAudio"
    formData.append("portada", data.portada[0]);
    formData.append("Usuario", Usuario.Id)
    formData.append("seccion", "Podcast");
    const respuesta = await sigout(formData)
    console.log(respuesta?.success)
    if (respuesta?.success) {
      setRegistroExitoso(true);
    }

    // Enviar al contexto o API
    console.log("Enviando podcast:", Object.fromEntries(formData));
    // crearPodcast(formData); // Si ya tienes esta función
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="fixed h-full w-64 bg-white shadow-lg z-10">
        <MenuLateral rol="docente" />
      </div>

      <div className="flex-1 ml-64 overflow-y-auto">
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Subir Nuevo Podcast
              </h2>
            </div>
            {PodcastErros.map((error, i) => (

              <Alerta key={i} tipo="error" mensaje={error.msg} />
            ))}
            {mensaje && (
              <Alerta tipo="exito" mensaje={mensaje} />

            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-3x1 font-semibold text-gray-800">Título del Podcast</label>
                  <input
                    type="text"
                    {...register("nombre_proyecto", { required: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                    placeholder="Ej: La revolución de la IA"
                  />
                  {errors.nombre_proyecto && (<p className="text-red-500 font-semibold text-sm">El titulo es requerido</p>)}
                </div>

                <div className="space-y-2">
                  <label className="block text-3x1 font-semibold text-gray-800">Descripción</label>
                  <textarea
                    {...register("descripcion", { required: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl h-40"
                    placeholder="Describe el contenido de tu podcast..."
                  />
                  {errors.descripcion && (<p className="text-red-500 font-semibold text-sm">La descripcion es requerida</p>)}

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-3x1 font-semibold text-gray-800">Autor</label>
                    <input
                      type="text"
                      {...register("autores", { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                      placeholder="Nombre del autor"
                    />
                    {errors.autores && (<p className="text-red-500 font-semibold text-sm">Los autores son requeridos</p>)}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-3x1 font-semibold text-gray-800">Fecha de Publicación</label>
                    <input
                      type="datetime-local"
                      {...register("fecha", { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                    />
                    {errors.fecha && (<p className="text-red-500 font-semibold text-sm">La fecha es requerida</p>)}
                  </div>
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
                      <option key={categoria.id}>
                        {categoria.Nombre_Categoria}
                      </option>
                    ))}
                  </select>
                  {errors.categoriaId && (
                    <p className="text-red-500 font-semibold text-sm">La categoria es requerida</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-3x1 font-semibold text-gray-800">Materia</label>
                  <select
                    {...register("materia", { required: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                  >
                    <option value="">Seleccionar materia</option>
                    <option value="fisica">Física</option>
                    <option value="ingenieria_civil">Ingeniería Civil</option>
                    <option value="matematicas">Matemáticas</option>
                  </select>
                  {errors.materia && (<p className="text-red-500 font-semibold text-sm">La materia es requerida</p>)}

                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 border-opacity-40 pb-2">Cargar Archivos</h3>

                  <div className="space-y-2">
                    <label className="block text-3x1 font-semibold text-gray-800">Link del Audio</label>
                    <input
                      type="url"
                      {...register("audioLink", { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                      placeholder="https://ejemplo.com/audio.mp3"
                    />
                    {errors.audioLink && (<p className="text-red-500 font-semibold text-sm">El link del audio es requerido</p>)}

                  </div>

                  <div className="space-y-2">
                    <label className="block text-3x1 font-semibold text-gray-800">Subir Portada</label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-indigo-500 bg-gray-50 hover:bg-indigo-50 transition-colors group">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("portada", {
                          required: "La imagen es obligatoria",
                          validate: {
                            tamaño: (archivos) =>
                              archivos[0]?.size <= MAX_SIZE || 'La imagen supera los 10MB',
                            tipo: (archivos) =>
                              /\.(jpg|jpeg|png|webp)$/i.test(archivos?.[0]?.name || '') ||
                              'El archivo debe ser una imagen (.jpg, .jpeg, .png, .webp)',
                          },
                        })}

                      />
                      {portada?.[0] && (
                        <span className="text-sm text-gray-700 mt-1">{portada[0].name}</span>
                      )}

                      {portada?.length > 0 && !errors.portada && (
                        <p className="text-green-500 text-center font-semibold text-sm">Imagen subida correctamente</p>
                      )}
                      {errors.portada && (
                        <p className="text-red-500 font-semibold text-sm">{errors.portada.message}</p>
                      )}

                      {!portada?.[0] && <ImageIcon className="w-10 h-10 text-black opacity-50" />}

                      {!portada?.[0] && <span className="text-sm">Imagen de la portada</span>}
                     
                    </label>
                  </div>

                  {portadaPreview && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Vista previa de la portada:</h4>
                      <img
                        src={URL.createObjectURL(portadaPreview)}
                        alt="Portada"
                        className="max-w-xs rounded-xl shadow-md border-2 border-gray-100"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-50 bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-indigo-200/50"
                >
                  Subir podcast
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubirPodcast;