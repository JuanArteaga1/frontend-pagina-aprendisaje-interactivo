import { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form"
import { UseSimulaciones } from "../context/SimulacionesContex";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext"
import { UseCategoria } from "../context/CategoriaContext"

import {
    Image,
    Upload,
    FileUp,
    UploadIcon,
} from "lucide-react";





import {
    FaFileUpload,
    FaAndroid,        // Icono de Android para APK
    FaFileCode,       // Icono para archivos de código
    FaImage,          // Icono para imágenes
    FaCalendarAlt,
    FaUserEdit,
    FaUpload          // Icono más adecuado para subir
} from 'react-icons/fa';

const SubirAPK = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { sigout, errors: SimulacionesErrors, mensaje } = UseSimulaciones()
    const { Usuario } = useLogin()
    const [setRegistroExitoso] = useState(false);
    const { TraerCategoria, Categoria } = UseCategoria()
    useEffect(() => {
        TraerCategoria();
        console.log(Categoria) // Llamada inicial para traer los datos
    }, []);





    return (
        <>
            <div className="flex h-screen bg-gray-100">
                {/* Menú Lateral */}
                <MenuLateral rol="docente" />

                <div className="flex-1 p-4 overflow-auto">
                    <div className="max-w-xl mx-auto">
                        {/* TÍTULO FUERA DEL CONTENEDOR */}
                        <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-4">Subir Aplicación</h2>

                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            {/*<h3 className="text-sm font-medium text-green-600 mb-3">Subir APK</h3>*/}
                            {SimulacionesErrors.map((error, i) => (
                                <Alerta key={i} tipo="error" mensaje={error.msg} />
                            ))}
                            {mensaje && (
                                <Alerta tipo="exito" mensaje={mensaje} />

                            )}
                            <form onSubmit={handleSubmit(async (data) => {
                                const formData = new FormData();

                                // Agregar los datos del formulario (campos de texto)
                                formData.append("nombre_proyecto", data.nombre_proyecto);
                                formData.append("descripcion", data.descripcion);
                                formData.append("autores", data.autores);
                                formData.append("fechaPublicacion", data.fechaPublicacion);
                                formData.append("materia", data.materia);
                                formData.append("Usuario", Usuario.Id)
                                formData.append("categoriaId", data.categoriaId);

                                // Asegúrate de que estos campos sean de tipo 'file'
                                if (data.urlArchivoapk && data.urlArchivoapk[0]) {
                                    formData.append("urlArchivoapk", data.urlArchivoapk[0]); // Para archivos APK
                                }
                                if (data.urlDoc && data.urlDoc[0]) {
                                    formData.append("urlDoc", data.urlDoc[0]); // Para documentos
                                }
                                if (data.portada && data.portada[0]) {
                                    formData.append("portada", data.portada[0]); // Para la imagen de portada
                                }

                                formData.append("seccion", "simulaciones"); // Establece la sección
                                const resultado = await sigout(formData);
                                if (resultado?.success) {
                                    setRegistroExitoso(true);
                                }


                            })} className="space-y-3">
                                <div>
                                    <label className="block text-3x1 font-semibold text-gray-800 mb-1">Nombre del APK</label>
                                    <input
                                        {...register('nombre_proyecto', {})}
                                        type="text"
                                        name="nombre_proyecto"
                                        className="w-full px-4 py-2 text-medium border-2 border-gray-200 rounded-xl"
                                        placeholder="Ej: MiAplicación v1.0"
                                        required
                                    />
                                    {errors.nombre_proyecto && (<p className="text-red-500">El nombre es requerido</p>)}
                                </div>

                                <div>
                                    <label className="block text-3x1 font-semibold text-gray-800 mb-1">Descripción técnica</label>
                                    <textarea
                                        {...register('descripcion', { required: true })}
                                        name="descripcion"
                                        className="w-full px-4 py-2 text-medium border-2 border-gray-200 rounded-xl"
                                        rows="2"
                                        placeholder="Especificaciones técnicas requeridas"
                                        required
                                    ></textarea>
                                    {errors.descripcion && (<p className="text-red-500">La descripcion es requerida</p>)}
                                </div>

                                <div>
                                    <label className="block text-3x1 font-semibold text-gray-800 mb-1">Desarrolladores</label>
                                    <input
                                        {...register('autores', { required: true })}
                                        type="text"
                                        name="autores"
                                        className="w-full  px-4 py-2 text-medium border-2 border-gray-200 rounded-xl"
                                        placeholder="Equipo de desarrollo"
                                        required
                                    />
                                    {errors.autores && (<p className="text-red-500">El autor es requerida</p>)}
                                </div>


                                <h3 className="text-3x1 font-semibold text-gray-800 mb-2">Fecha de compilación</h3>
                                <input
                                    {...register('fechaPublicacion', { required: true })}
                                    type="datetime-local"
                                    name="fechaPublicacion"
                                    className="w-full px-4 py-2 text-medium border-2 border-gray-200 rounded-xl"
                                    required
                                />
                                {errors.fechaPublicacion && (<p className="text-red-500">La fecha es requerida</p>)}

                                <div>
                                    <label className="block text-3x1 font-semibold text-gray-800 mb-1">Materia</label>
                                    <select
                                        {...register('materia', { required: true })}
                                        name="materia"
                                        className="w-full px-4 py-2 text-medium border-2 border-gray-200 rounded-xl"
                                        required
                                    >

                                        <option value="">Seleccionar materia</option>
                                        <option value="Fisica">Fisica</option>
                                        <option value="ingenieria civil">Ingeniería Civil</option>
                                        <option value="Matematicas">Matematicas</option>
                                    </select>
                                    {errors.materia && (<p className="text-red-500">La materia es requerida</p>)}
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
                                        {Categoria && Categoria.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.Nombre_Categoria}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.categoriaId && (
                                        <p className="text-red-500">Categoria es requerida</p>
                                    )}
                                </div>

                                <h3 className="text-3x1 font-semibold text-gray-800 mb-2">Archivos requeridos</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {/* APK Principal */}
                                    <label className="flex flex-col items-center p-2 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                                        <UploadIcon className="w-5 h-5 text-black" />
                                        <span className="text-3x1 text-center">APK Principal</span>
                                        <input
                                            {...register('urlArchivoapk', { required: true })}
                                            name="urlArchivoapk"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        {errors.urlArchivoapk && (<p className="text-red-500">La apk es requerida</p>)}
                                    </label>

                                    {/* Requisitos */}
                                    <label className="flex flex-col items-center p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                                        <FileUp className="w-5 h-5 text-black" />
                                        <span className="text-3x1 text-center">Requisitos (PDF)</span>
                                        <input
                                            {...register('urlDoc', { required: true })}
                                            name="urlDoc"
                                            type="file"
                                            className="hidden"
                                            accept=".pdf"

                                        />
                                        {errors.urlDoc && (<p className="text-red-500">El documento es requerido</p>)}
                                    </label>

                                    {/* Capturas */}
                                    <label className="flex flex-col items-center p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                                        <Image className="w-5 h-5 text-black" />
                                        <span className="text-3x1 text-center">Capturas</span>
                                        <input
                                            {...register('portada', { required: true })}
                                            name="portada"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                        />
                                        {errors.portada && (<p className="text-red-500">La imagen es requerida</p>)}

                                    </label>
                                </div>


                                {/* Vista previa de capturas */}



                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        className="w-50 bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-indigo-200/50"
                                    >
                                        Subir APK
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubirAPK;