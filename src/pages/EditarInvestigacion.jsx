import React, { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import { useInvestigacion } from "../context/InvestigacionContext";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaFileUpload,
    FaFilePdf,
    FaImage,
    FaCalendarAlt,
    FaUserEdit,
    FaPaperclip,
    FaLink,
} from "react-icons/fa";

function EditarInvestigacion() {
    const location = useLocation();
    const navigate = useNavigate();
    const investigacion = location.state?.investigacion;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [investigacionActual, setInvestigacionActual] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        if (investigacion) {
            setInvestigacionActual(investigacion);

            const fechaFormateada = new Date(investigacion.fechaPublicacion).toISOString().split("T")[0];

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
            const formData = new FormData();
            formData.append("nombre_proyecto", data.nombre_proyecto);
            formData.append("descripcion", data.descripcion);
            formData.append("autores", data.autores);
            formData.append("fechaPublicacion", data.fechaPublicacion);
            formData.append("materia", data.materia);
            formData.append("urlArticulo", data.urlArticulo);
            formData.append("urlDoi", data.urlDoi);

            if (data.archivo && data.archivo[0]) {
                formData.append("archivo", data.archivo[0]);
            }

            await axios.put(`http://localhost:3001/api/investigaciones/${investigacion._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Investigación actualizada con éxito");
            navigate("/misproyectos");
        } catch (error) {
            console.error("Error al actualizar la investigación:", error);
            alert("Hubo un error al actualizar la investigación");
        }
    };

    const handleCancel = () => {
        navigate("/misproyectos");
    };

    if (!investigacionActual) return <p className="p-8">Cargando datos de la investigación...</p>;

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

                        <form onSubmit={handleSubmit(onSubmit)} className="formulario">

                            {/* Título */}
                            <div>
                                <label className="block mb-1 font-semibold text-gray-800">Título</label>
                                <input
                                    {...register("nombre_proyecto", { required: "El título es obligatorio" })}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    placeholder="Ingrese el título de la investigación"
                                />
                                {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
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
                                {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
                            </div>

                            {/* Autores y Fecha */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                                        <FaUserEdit className="text-blue-500" /> Autores
                                    </label>
                                    <input
                                        {...register("autores")}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        placeholder="Nombres de los autores"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                                        <FaCalendarAlt className="text-blue-500" /> Fecha
                                    </label>
                                    <input
                                        type="date"
                                        {...register("fechaPublicacion")}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
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
                                    <option value="fisica">Fisica</option>
                                    <option value="ingenieria_civil">Ingeniería Civil</option>
                                    <option value="matematicas">Matematicas</option>
                                </select>
                                {errors.materia && <p className="text-red-500 text-sm">{errors.materia.message}</p>}
                            </div>

                            {/* URL Artículo */}
                            <div>
                                <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                                    <FaLink className="text-green-500" /> URL del Artículo
                                </label>
                                <input
                                    type="url"
                                    {...register("urlArticulo", { required: "Debe ingresar el enlace del artículo" })}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                                    placeholder="https://ejemplo.com/articulo"
                                />
                                {errors.UrlArticulo && <p className="text-red-500 text-sm">{errors.UrlArticulo.message}</p>}
                            </div>

                            {/* URL DOI */}
                            <div>
                                <label className="flex items-center gap-2 mb-1 text-gray-800 font-semibold">
                                    <FaLink className="text-green-500" /> URL DOI
                                </label>
                                <input
                                    type="url"
                                    {...register("urlDoi", { required: "Debe ingresar la URL del DOI" })}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                                    placeholder="https://doi.org/xxxxx"
                                />
                                {errors.UrlDoi && <p className="text-red-500 text-sm">{errors.UrlDoi.message}</p>}
                            </div>

                            {/* Subir Archivos */}
                            <div>
                                <h3 className="text-gray-800 font-semibold mb-3">Subir archivos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                                        <FaImage className="text-4xl text-blue-500 mb-2" />
                                        <span className="font-medium">Imagen de la portada</span>
                                        <span className="text-xs text-gray-500">(JPG, PNG)</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            {...register('portada', {
                                                required: 'Se requiere una imagen',
                                                validate: {
                                                    tamaño: (archivos) =>
                                                        archivos[0]?.size <= MAX_SIZE || 'La imagen supera los 10MB',
                                                },
                                            })}

                                        />
                                    </label>

                                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                                        <FaFilePdf className="text-4xl text-red-500 mb-2" />
                                        <span className="font-medium">Documento PDF</span>
                                        <span className="text-xs text-gray-500">(Artículo completo)</span>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            className="hidden"
                                            {...register('urlDoc', {
                                                required: 'Se requiere una Documento',
                                                validar: {
                                                    tamaño: (archivos) => archivos[0]?.size <= MAX_SIZE || 'Audio supera los 10MB',
                                                },

                                            })}
                                        />
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