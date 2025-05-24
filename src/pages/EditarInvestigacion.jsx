import React, { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import { useInvestigacion } from "../context/InvestigacionContext";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ImageIcon, UploadIcon } from 'lucide-react';


function EditarInvestigacion() {
    const location = useLocation();
    const navigate = useNavigate();
    const investigacion = location.state?.investigacion;
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [investigacionActual, setInvestigacionActual] = useState(null);
    const { ActualizarInvestigaciones, errors: InvestigacionErrors, } = useInvestigacion()
    const { Usuario, setUsuario } = useLogin()
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const portada = watch('portada');
    const urlDoc = watch('urlDoc');

    const [fechaFormateada, setFechaFormateada] = useState("");

    const { id } = useParams();


    useEffect(() => {
        if (investigacion) {
            setInvestigacionActual(investigacion);

            if (investigacion.fechaPublicacion) {
                const fecha = new Date(investigacion.fechaPublicacion);
                if (!isNaN(fecha.getTime())) {
                    setFechaFormateada(fecha.toISOString().slice(0, 16));
                }
            }

            setValue("nombre_proyecto", investigacion.nombre_proyecto);
            setValue("descripcion", investigacion.descripcion);
            setValue("autores", investigacion.autores);
            setValue("fechaPublicacion", fechaFormateada);
            setValue("materia", investigacion.materia);
            setValue("urlArticulo", investigacion.urlArticulo);
            setValue("urlDoi", investigacion.urlDoi);
        }
    }, [investigacion, setValue]);

    const onSubmit = async (data) => {
        try {
            console.log(data)
            const formData = new FormData();
            formData.append("nombre_proyecto", data.nombre_proyecto);
            formData.append("descripcion", data.descripcion);
            formData.append("autores", data.autores);
            formData.append("fechaPublicacion", data.fechaPublicacion);
            formData.append("materia", data.materia);
            formData.append("portada", data.portada[0]);
            formData.append("urlArticulo", data.urlArticulo);
            formData.append("urlDoi", data.urlDoi);
            formData.append("urlDoc", data.urlDoc[0]);
            formData.append("Usuario", Usuario.Id)
            formData.append("seccion", "Investigacion");
            const respuesta = await ActualizarInvestigaciones(id, formData)
            if (respuesta?.success) {
                if (Usuario.Rol === "Docente") {
                    navigate("/misproyectos", {
                        state: {
                            mensaje: "Investigación actualizada correctamente",
                            tipo: "success"
                        }
                    });
                } else if (Usuario.Rol === "Administrador") {
                    navigate("/VerProyectos", {
                        state: {
                            mensaje: "Investigacion actualizada correctamente",
                            tipo: "success"
                        }
                    });
                }

            }





        } catch (error) {
        }
    };

    const handleCancel = () => {
        navigate("/misproyectos");
    };


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Menú Lateral */}
            <MenuLateral rol="docente" />
            <main className="flex-1 w-full p-8 overflow-y-auto">
                {/* Contenido principal */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-4">Editar Investigación</h2>
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

                        {/* Formulario */}
                        {InvestigacionErrors.map((error, i) => (
                            <Alerta key={i} tipo="error" mensaje={error.msg} />
                        ))}


                        <form onSubmit={handleSubmit(onSubmit)} className="formulario">

                            {/* Título */}
                            <div>
                                <label className="block mb-1 font-semibold text-gray-800">Título</label>
                                <input
                                    {...register("nombre_proyecto", { required: "El título es obligatorio" })}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    placeholder="Ingrese el título de la investigación"
                                />
                                {errors.nombre_proyecto && <p className="text-red-500 font-semibold text-sm">{errors.nombre_proyecto.message}</p>}
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
                                {errors.descripcion && <p className="text-red-500 font-semibold text-sm">{errors.descripcion.message}</p>}
                            </div>

                            {/* Autores y Fecha */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                                        Autores
                                    </label>
                                    <input
                                        {...register("autores", { required: "El autor es requerido" })}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        placeholder="Nombres de los autores"
                                    />
                                    {errors.autores && <p className="text-red-500 font-semibold text-sm">{errors.autores.message}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                                        Fecha
                                    </label>
                                    <input
                                        type="datetime-local"
                                        {...register("fechaPublicacion", { required: "La fecha es requerida" })}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                    {errors.fechaPublicacion && <p className="text-red-500 font-semibold text-sm">{errors.fechaPublicacion.message}</p>}
                                </div>
                            </div>

                            {/* Materia */}
                            <div>
                                <label className="block text-3x1 font-semibold text-gray-800">Materia</label>
                                <select
                                    {...register("materia", { required: "La materia es obligatoria" })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                >
                                    <option value="">Seleccionar materia</option>
                                    <option value="Fisica">Fisica</option>
                                    <option value="ingenieria civil">Ingeniería Civil</option>
                                    <option value="Matematicas">Matematicas</option>
                                </select>
                                {errors.materia && <p className="text-red-500 font-semibold text-sm">{errors.materia.message}</p>}
                            </div>

                            {/* URL Artículo */}
                            <div>
                                <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                                    URL del Artículo
                                </label>
                                <input
                                    type="url"
                                    {...register("urlArticulo", { required: "Debe ingresar el enlace del artículo" })}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                                    placeholder="https://ejemplo.com/articulo"
                                />
                                {errors.UrlArticulo && <p className="text-red-500 font-semibold text-sm">{errors.UrlArticulo.message}</p>}
                            </div>

                            {/* URL DOI */}
                            <div>
                                <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                                    URL DOI
                                </label>
                                <input
                                    type="url"
                                    {...register("urlDoi", { required: "Debe ingresar la URL del DOI" })}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                                    placeholder="https://doi.org/xxxxx"
                                />
                                {errors.UrlDoi && <p className="text-red-500 font-semibold text-sm">{errors.UrlDoi.message}</p>}
                            </div>

                            {/* Subir Archivos */}
                            <div>
                                <h3 className="text-gray-800 font-semibold mb-3">Subir archivos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png,.webp"
                                            className="hidden"
                                            {...register('portada', {
                                                required: 'Se requiere una imagen',
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

                                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">

                                        <input
                                            type="file"
                                            accept=".pdf"
                                            className="hidden"
                                            {...register('urlDoc', {
                                                required: 'Se requiere un documento',
                                                validate: {
                                                    tamaño: (archivos) => archivos[0]?.size <= MAX_SIZE || 'El documento es muy pesado',
                                                    tipo: (archivos) =>
                                                        archivos?.[0]?.name?.toLowerCase().endsWith('.pdf') || 'El archivo debe ser un PDF',
                                                },

                                            })}
                                        />
                                        {urlDoc?.[0] && (
                                            <span className="text-sm text-gray-700 mt-1">{urlDoc[0].name}</span>
                                        )}

                                        {urlDoc?.length > 0 && !errors.urlDoc && (
                                            <p className="text-green-500 text-center font-semibold text-sm">Documento subido correctamente</p>
                                        )}
                                        {errors.urlDoc && (
                                            <p className="text-red-500 font-semibold text-sm">{errors.urlDoc.message}</p>
                                        )}

                                        {!urlDoc?.[0] && <UploadIcon className="w-10 h-10 text-black opacity-50" />}
                                        {!urlDoc?.[0] && <span className="text-sm">Documento PDF</span>}

                                    </label>

                                </div>
                            </div>


                            <div className="flex justify-end gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 border rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-800"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                                >
                                    Actualizar Investigacion
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </main>
        </div >
    );
}

export default EditarInvestigacion;