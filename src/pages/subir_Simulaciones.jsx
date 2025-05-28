import { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm, useFieldArray } from "react-hook-form";
import { UseSimulaciones } from "../context/SimulacionesContex";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext";
import { UseCategoria } from "../context/CategoriaContext";
import { Image, FileUp, UploadIcon } from "lucide-react";

const SubirAPK = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset, control } = useForm();
  const { sigout, errors: SimulacionesErrors, mensaje, setMensaje, setErrors } = UseSimulaciones();
  const { Usuario } = useLogin();
  const [setRegistroExitoso] = useState(false);
  const { TraerCategoria, Categoria } = UseCategoria();
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const archivoAPK = watch('urlArchivoapk');
  const portada = watch('portada');
  const urlDoc = watch('urlDoc');

  // CORRECCIÓN: useFieldArray para el manejo de autores
  const { fields, append, remove } = useFieldArray({
    control,
    name: "autores"
  });

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
    if (SimulacionesErrors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [SimulacionesErrors]);

  return (
    <div className="flex h-screen bg-gray-100">
      {mensaje && (
        <div className="fixed top-5 right-5 z-50">
          <Alerta tipo="exito" mensaje={mensaje} onClose={() => setMensaje(null)} />
        </div>
      )}

      {SimulacionesErrors.length > 0 && (
        <div className="fixed top-20 right-5 z-50 space-y-2">
          {SimulacionesErrors.map((error, i) => (
            <Alerta key={i} tipo="error" mensaje={error.msg} />
          ))}
        </div>
      )}

      <MenuLateral rol="docente" />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Subir simulación</h2>

          <form
            onSubmit={handleSubmit(async (data) => {
              const formData = new FormData();
              formData.append("nombre_proyecto", data.nombre_proyecto);
              formData.append("descripcion", data.descripcion);
              const autoresFormateados = data.autores.map(a => a.nombre).join(", ");
              formData.append("autores", autoresFormateados);
              formData.append("fechaPublicacion", data.fechaPublicacion);
              formData.append("materia", data.materia);
              formData.append("Usuario", Usuario.Id);
              formData.append("categoriaId", data.categoriaId);
              if (data.urlArchivoapk?.[0]) formData.append("urlArchivoapk", data.urlArchivoapk[0]);
              if (data.urlDoc?.[0]) formData.append("urlDoc", data.urlDoc[0]);
              if (data.portada?.[0]) formData.append("portada", data.portada[0]);
              formData.append("seccion", "simulaciones");

              const resultado = await sigout(formData);
              if (resultado?.success) {
                setRegistroExitoso(true);
                reset(); // Limpia el formulario después del envío
              }
            })}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Nombre de la simulación</label>
                <input
                  {...register('nombre_proyecto', { required: true })}
                  type="text"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                  placeholder="Ej: MiAplicación v1.0"
                />
                {errors.nombre_proyecto && (<p className="text-red-500 text-sm">El nombre es requerido</p>)}
              </div>

              {/* Sección de autores */}
              <div className="space-y-2">
                <label className="block text-base font-semibold text-gray-800">Autores</label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <input
                      type="text"
                      {...register(`autores.${index}.nombre`, {
                        required: "El nombre del autor es obligatorio"
                      })}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-md"
                      placeholder={`Autor #${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 text-xl font-bold"
                      title="Eliminar autor"
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
                {errors.autores && <p className="text-red-500 text-sm">{errors.autores.message}</p>}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Fecha de compilación</label>
                <input
                  {...register('fechaPublicacion', { required: true })}
                  type="datetime-local"
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                />
                {errors.fechaPublicacion && (<p className="text-red-500 text-sm">La fecha es requerida</p>)}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Categoría</label>
                <select
                  {...register('categoriaId', { required: true })}
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                >
                  <option value="">Seleccionar categoría</option>
                  {Categoria?.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.Nombre_Categoria}</option>
                  ))}
                </select>
                {errors.categoriaId && (<p className="text-red-500 text-sm">Categoria es requerida</p>)}
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-semibold text-gray-800 mb-1">Descripción técnica</label>
                <textarea
                  {...register('descripcion', { required: true })}
                  className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                  rows={4}
                  placeholder="Especificaciones técnicas requeridas"
                />
                {errors.descripcion && (<p className="text-red-500 text-sm">La descripción es requerida</p>)}
              </div>

              <div className="md:col-span-2">
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
                {errors.materia && (<p className="text-red-500 text-sm">La materia es requerida</p>)}
              </div>
            </div>

            {/* Archivos */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-800">Cargar Archivos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {/* APK */}
                <FileUpload
                  label="Subir APK"
                  accept=".apk"
                  name="urlArchivoapk"
                  file={archivoAPK}
                  error={errors.urlArchivoapk}
                  register={register}
                />
                {/* PDF */}
                <FileUpload
                  label="Subir PDF"
                  accept=".pdf"
                  name="urlDoc"
                  file={urlDoc}
                  error={errors.urlDoc}
                  register={register}
                />
                {/* Imagen */}
                <FileUpload
                  label="Subir IMG"
                  accept="image/*"
                  name="portada"
                  file={portada}
                  error={errors.portada}
                  register={register}
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-50 bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-indigo-200/50"
              >
                Subir simulación
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

// Componente reutilizable para carga de archivos
const FileUpload = ({ label, accept, name, file, error, register }) => {
  const Icon = name === 'urlArchivoapk' ? UploadIcon : name === 'urlDoc' ? FileUp : Image;
  return (
    <label className="flex flex-col items-center justify-center w-full max-w-[220px] aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
      <input type="file" className="hidden" accept={accept} {...register(name, {
        required: `Se requiere un archivo`,
        validate: {
          tamaño: (archivos) => archivos?.[0]?.size <= 10 * 1024 * 1024 || 'Archivo supera los 10MB',
        }
      })} />
      {file?.[0] ? (
        <>
          <span className="text-center text-sm text-gray-700 mt-1 break-words w-full px-2">{file[0].name}</span>
          {!error && <p className="text-green-500 text-center text-sm">Archivo subido correctamente</p>}
        </>
      ) : (
        <>
          <Icon className="w-5 h-5 text-black" />
          <span className="text-sm text-gray-600 mt-1">{label}</span>
        </>
      )}
      {error && <p className="text-red-500 text-center text-sm">{error.message}</p>}
    </label>
  );
};

export default SubirAPK;
