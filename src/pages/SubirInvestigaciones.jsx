import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ImageIcon, UploadIcon } from 'lucide-react';
import MenuLateral from "../components/MenuAdmi_Doc";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext";
import { useInvestigacion } from "../context/InvestigacionContext";

const SubirInvestigaciones = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      autores: [""],
    },
  });

  const { submitInvestigacion, errors: InvestigacionErrors, mensaje, setMensaje, setErrors } = useInvestigacion();
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const { Usuario } = useLogin();
  const MAX_SIZE = 10 * 1024 * 1024;

  const portada = watch('portada');
  const urlDoc = watch('urlDoc');

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setRegistroExitoso(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  useEffect(() => {
    if (InvestigacionErrors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 8000);
      return () => clearTimeout(timer);
    }
  }, [InvestigacionErrors]);

  return (
    <div className="flex h-screen bg-gray-100">
      {mensaje && (
        <div className="fixed top-5 right-5 z-50">
          <Alerta tipo="exito" mensaje={mensaje} onClose={() => setMensaje(null)} />
        </div>
      )}

      {InvestigacionErrors.length > 0 && (
        <div className="fixed top-20 right-5 z-50 space-y-2">
          {InvestigacionErrors.map((error, i) => (
            <Alerta key={i} tipo="error" mensaje={error.msg} />
          ))}
        </div>
      )}

      <MenuLateral rol="docente" />
      
      <div className="flex-1 p-8 overflow-x-hidden overflow-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Subir Investigación
        </h2>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <form
            onSubmit={handleSubmit(async (data) => {
              const formData = new FormData();
              formData.append("nombre_proyecto", data.nombre_proyecto);
              formData.append("descripcion", data.descripcion);
              formData.append("autores", data.autores.join(", "));
              formData.append("fechaPublicacion", data.fechaPublicacion);
              formData.append("materia", data.materia);
              formData.append("urlArticulo", data.urlArticulo);
              formData.append("urlDoi", data.urlDoi);
              formData.append("portada", data.portada[0]);
              formData.append("urlDoc", data.urlDoc[0]);
              formData.append("Usuario", Usuario.Id);
              formData.append("seccion", "Investigacion");

              const resultado = await submitInvestigacion(formData);
              if (resultado?.success) {
                setRegistroExitoso(true);
              }
            })}
            className="space-y-6"
          >
            {/* Campos del formulario */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">Título</label>
              <input
                {...register("nombre_proyecto", {
                  required: "El título es obligatorio",
                })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Ingrese el título"
              />
              {errors.nombre_proyecto && (
                <p className="text-red-500 font-semibold text-sm">
                  {errors.nombre_proyecto.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-800">Descripción</label>
              <textarea
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                })}
                rows="4"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Descripción detallada"
              />
              {errors.descripcion && (
                <p className="text-red-500 font-semibold text-sm">
                  {errors.descripcion.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-gray-800">Autores</label>
                <Controller
                  control={control}
                  name="autores"
                  rules={{
                    validate: (value) =>
                      value.length > 0 &&
                      value.every((autor) => autor.trim() !== "") ||
                      "Debe ingresar al menos un autor válido",
                  }}
                  render={({ field }) => (
                    <>
                      {field.value.map((autor, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                          <input
                            value={autor}
                            onChange={(e) => {
                              const nuevosAutores = [...field.value];
                              nuevosAutores[index] = e.target.value;
                              field.onChange(nuevosAutores);
                            }}
                            className="flex-grow px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder={`Autor ${index + 1}`}
                          />
                          {field.value.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const nuevosAutores = field.value.filter(
                                  (_, i) => i !== index
                                );
                                field.onChange(nuevosAutores);
                              }}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              X
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => field.onChange([...field.value, ""])}
                        className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      >
                        + Añadir autor
                      </button>
                    </>
                  )}
                />
                {errors.autores && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.autores.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-800">Fecha</label>
                <input
                  type="datetime-local"
                  {...register("fechaPublicacion", {
                    required: "La fecha es requerida",
                  })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors.fechaPublicacion && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.fechaPublicacion.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-800">Materia</label>
              <select
                {...register("materia", { required: "Debe seleccionar una materia" })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
              >
                <option value="">Seleccionar materia</option>
                <option value="Fisica">Física</option>
                <option value="Ingenieria Civil">Ingeniería Civil</option>
                <option value="Matematicas">Matemáticas</option>
              </select>
              {errors.materia && (
                <p className="text-red-500 font-semibold text-sm">{errors.materia.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-800">URL del Artículo</label>
              <input
                type="url"
                {...register("urlArticulo", {
                  required: "Debe ingresar el enlace del artículo",
                })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="https://ejemplo.com/articulo"
              />
              {errors.urlArticulo && (
                <p className="text-red-500 font-semibold text-sm">{errors.urlArticulo.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-800">URL DOI</label>
              <input
                type="url"
                {...register("urlDoi", {
                  required: "Debe ingresar la URL del DOI",
                })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="https://doi.org/xxxxx"
              />
              {errors.urlDoi && (
                <p className="text-red-500 font-semibold text-sm">{errors.urlDoi.message}</p>
              )}
            </div>

            <div>
              <h3 className="text-gray-800 font-semibold mb-3">Subir archivos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                    {...register("portada", {
                      required: "Se requiere una imagen",
                      validate: {
                        tamaño: (files) => files[0]?.size <= MAX_SIZE || 'La imagen supera los 10MB',
                        tipo: (files) => /\.(jpg|jpeg|png|webp)$/i.test(files?.[0]?.name) || 'Debe ser una imagen',
                      },
                    })}
                  />
                  {portada?.[0] && (
                    <span className="text-sm text-gray-700 mt-1">{portada[0].name}</span>
                  )}
                  {errors.portada ? (
                    <p className="text-red-500 font-semibold text-sm">{errors.portada.message}</p>
                  ) : (
                    !portada?.[0] && (
                      <>
                        <ImageIcon className="w-10 h-10 text-black opacity-50" />
                        <span className="text-sm">Imagen de portada</span>
                      </>
                    )
                  )}
                </label>

                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    {...register("urlDoc", {
                      required: "Se requiere un documento",
                      validate: {
                        tamaño: (files) => files[0]?.size <= MAX_SIZE || 'El documento supera los 10MB',
                        tipo: (files) => files?.[0]?.name?.endsWith('.pdf') || 'Debe ser un PDF',
                      },
                    })}
                  />
                  {urlDoc?.[0] && (
                    <span className="text-sm text-gray-700 mt-1">{urlDoc[0].name}</span>
                  )}
                  {errors.urlDoc ? (
                    <p className="text-red-500 font-semibold text-sm">{errors.urlDoc.message}</p>
                  ) : (
                    !urlDoc?.[0] && (
                      <>
                        <UploadIcon className="w-10 h-10 text-black opacity-50" />
                        <span className="text-sm">Documento PDF</span>
                      </>
                    )
                  )}
                </label>
              </div>
            </div>

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