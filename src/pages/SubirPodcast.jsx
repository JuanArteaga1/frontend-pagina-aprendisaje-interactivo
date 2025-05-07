import React, { useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import { usePodcast } from "../context/PodcastContext";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext"


function SubirPodcast() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { sigout, errors: PodcastErros, mensaje } = usePodcast(); // Si tienes esta función en contexto
  const portadaPreview = watch("portada")?.[0];
  const [setRegistroExitoso] = useState(false);
  const { Usuario, setUsuario } = useLogin()


  const onSubmit = async (data) => {
    const formData = new FormData();
    // Agregar datos del formulario
    console.log(data)
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
                  {errors.titulo && (<p className="text-red-500">El titulo es requerido</p>)}
                </div>

                <div className="space-y-2">
                  <label className="block text-3x1 font-semibold text-gray-800">Descripción</label>
                  <textarea
                    {...register("descripcion", { required: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl h-40"
                    placeholder="Describe el contenido de tu podcast..."
                  />
                  {errors.descripcion && (<p className="text-red-500">la descripcion es requerido</p>)}

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
                    {errors.autores && (<p className="text-red-500">los autores son requerido</p>)}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-3x1 font-semibold text-gray-800">Fecha de Publicación</label>
                    <input
                      type="date"
                      {...register("fecha", { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                    />
                    {errors.fecha && (<p className="text-red-500">la fecha es requerido</p>)}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-3x1 font-semibold text-gray-800">Categoría</label>
                  <select
                    {...register("categoria", { required: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="educacion">Educación</option>
                    <option value="entretenimiento">Entretenimiento</option>
                    <option value="negocios">Negocios</option>
                  </select>
                  {errors.categoria && (<p className="text-red-500">la categoria es requerido</p>)}

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
                  {errors.materia && (<p className="text-red-500">la materia es requerido</p>)}

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
                    {errors.audioLink && (<p className="text-red-500">el link del audio es requerido</p>)}

                  </div>

                  <div className="space-y-2">
                    <label className="block text-3x1 font-semibold text-gray-800">Subir Portada</label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-indigo-500 bg-gray-50 hover:bg-indigo-50 transition-colors group">
                      <input
                        type="file"
                        accept="image/*"
                        {...register("portada", { required: true })}
                        className="hidden"
                      />
                      {errors.portada && (<p className="text-red-500">portada es requerida</p>)}

                      <div className="text-4xl mb-3 text-gray-400 group-hover:text-indigo-500">🖼️</div>
                      <p className="text-center text-sm text-gray-500">
                        {portadaPreview
                          ? <span className="text-indigo-600 font-semibold">{portadaPreview.name}</span>
                          : "Haz clic para subir la imagen de portada"}
                      </p>
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

              <button
                type="submit"
                className="w-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-indigo-200/50"
              >
                Publicar Podcast
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubirPodcast;