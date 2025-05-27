import React, { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import { useLogin } from "../context/LoginContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { UseSimulaciones } from "../context/SimulacionesContex";
import axios from "axios";
import Alerta from "../components/AlertasDocente";
import { UseCategoria } from "../context/CategoriaContext"
import { Image, FileUp, UploadIcon, } from "lucide-react";


function EditarSimulaciones() {
    const location = useLocation();
    const navigate = useNavigate();
    const simulacion = location.state?.simulacion;
    const { Usuario } = useLogin();
    const { errors: SimulacionesErrors, mensaje, ActualizarSimulaciones } = UseSimulaciones()
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [simulacionActual, setSimulacionActual] = useState(null);
    const { id } = useParams();
    const { TraerCategoria, Categoria } = UseCategoria()
    const [fechaFormateada, setFechaFormateada] = useState("");
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB

    const archivoAPK = watch('urlArchivoapk');
    const portada = watch('portada');
    const urlDoc = watch('urlDoc');


    useEffect(() => {
        TraerCategoria();
        console.log(Categoria)
    }, []);


    useEffect(() => {
        if (simulacion) {
            setSimulacionActual(simulacion);

            if (simulacion.fechaPublicacion) {
                const fecha = new Date(simulacion.fechaPublicacion);
                if (!isNaN(fecha.getTime())) {
                    setFechaFormateada(fecha.toISOString().slice(0, 16));
                }
            }

            setValue("nombre_proyecto", simulacion.nombre_proyecto);
            setValue("descripcion", simulacion.descripcion);
            setValue("autores", simulacion.autores);
            setValue("fechaPublicacion", simulacion.fechaPublicacion); // original
            setValue("materia", simulacion.materia);
            setValue("categoriaId", simulacion.categoriaId);
        }
    }, [simulacion, setValue]);


    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("nombre_proyecto", data.nombre_proyecto);
            formData.append("descripcion", data.descripcion);
            formData.append("autores", data.autores);
            formData.append("fechaPublicacion", data.fechaPublicacion);
            formData.append("materia", data.materia);
            formData.append("categoriaId", data.categoriaId);
            formData.append("Usuario", Usuario.Id);
            formData.append("seccion", "simulaciones"); // Establece la sección

            if (data.urlArchivoapk?.[0]) formData.append("urlArchivoapk", data.urlArchivoapk[0]);
            if (data.urlDoc?.[0]) formData.append("urlDoc", data.urlDoc[0]);
            if (data.portada?.[0]) formData.append("portada", data.portada[0]);
            const respuesta = await ActualizarSimulaciones(id, formData)
            if (respuesta?.success) {
                if (Usuario.Rol === "Docente") {
                    navigate("/misproyectos", {
                        state: {
                            mensaje: "Simulacion actualizada correctamente",
                            tipo: "success"
                        }
                    });
                } else if (Usuario.Rol === "Administrador") {
                    navigate("/VerProyectos", {
                        state: {
                            mensaje: "Simulación actualizada correctamente",
                            tipo: "success"
                        }
                    });
                }

            }


        } catch (error) {
            console.error("Error al actualizar la simulación:", error);
            alert("Hubo un error al actualizar la simulación");
        }
    };

    const handleCancel = () => {
        navigate("/misproyectos");
    };

    if (!simulacionActual) return <p className="p-8">Cargando datos de la simulación...</p>;

    return (
        <div className="flex h-screen bg-gray-100">
            <MenuLateral rol="docente" />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Editar Simulación</h2>

                    {SimulacionesErrors.map((error, i) => (
                        <Alerta key={i} tipo="error" mensaje={error.msg} />
                    ))}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-1">Nombre del APK</label>
                                <input
                                    {...register('nombre_proyecto', { required: true })}
                                    type="text"
                                    name="nombre_proyecto"
                                    className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                                    placeholder="Ej: MiAplicación v1.0"
                                />
                                {errors.nombre_proyecto && (
                                    <p className="text-red-500 font-semibold text-sm">El nombre es requerido</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-1">Desarrolladores</label>
                                <input
                                    {...register('autores', { required: true })}
                                    type="text"
                                    name="autores"
                                    className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                                    placeholder="Equipo de desarrollo"
                                />
                                {errors.autores && (
                                    <p className="text-red-500 font-semibold text-sm">El autor es requerido</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-1">Fecha de compilación</label>
                                <input
                                    {...register('fechaPublicacion', { required: true })}
                                    type="datetime-local"
                                    value={fechaFormateada}
                                    onChange={(e) => {
                                        setFechaFormateada(e.target.value);
                                        setValue("fechaPublicacion", e.target.value);
                                    }}
                                    className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                                />
                                {errors.fechaPublicacion && (
                                    <p className="text-red-500 font-semibold text-sm">La fecha es requerida</p>
                                )}
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
                                {errors.categoriaId && (
                                    <p className="text-red-500 font-semibold text-sm">Categoria es requerida</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-base font-semibold text-gray-800 mb-1">Descripción técnica</label>
                                <textarea
                                    {...register('descripcion', { required: true })}
                                    name="descripcion"
                                    className="mt-1 block w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                                    rows="4"
                                    placeholder="Especificaciones técnicas requeridas"
                                ></textarea>
                                {errors.descripcion && (
                                    <p className="text-red-500 font-semibold text-sm">La descripción es requerida</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
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
                                {errors.materia && (
                                    <p className="text-red-500 font-semibold text-sm">La materia es requerida</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-base font-semibold text-gray-800">Archivos requeridos</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                                <label className="flex flex-col items-center justify-center w-full max-w-[220px] aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".apk"
                                        {...register('urlArchivoapk', {
                                            required: 'Se requiere una APK',
                                            validate: {
                                                tamaño: (archivos) => archivos[0]?.size <= MAX_SIZE || 'El archivo supera los 10MB',
                                                tipo: (archivos) =>
                                                    archivos?.[0]?.name.toLowerCase().endsWith('.apk') || 'El archivo debe ser .apk',
                                            },
                                        })}
                                    />
                                    {archivoAPK?.[0] && (
                                        <span className="text-center text-sm text-gray-700 mt-1 break-words w-full px-2 max-w-[220px]">
                                            {archivoAPK[0].name}
                                        </span>
                                    )}
                                    {archivoAPK?.length > 0 && !errors.urlArchivoapk && (
                                        <p className="text-green-500 text-center font-semibold text-sm">APK subida correctamente</p>
                                    )}
                                    {errors.urlArchivoapk && (
                                        <p className="text-red-500 text-center font-semibold text-sm">{errors.urlArchivoapk.message}</p>
                                    )}
                                    {!archivoAPK?.[0] && <UploadIcon className="w-5 h-5 text-black" />}
                                    {!archivoAPK?.[0] && <span className="text-sm text-gray-600 mt-1">APK Principal</span>}
                                </label>

                                <label className="flex flex-col items-center justify-center w-full max-w-[220px] aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".pdf"
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
                                        <span className="text-sm text-center text-gray-700 mt-1 break-words w-full px-2 max-w-[220px]">
                                            {urlDoc[0].name}
                                        </span>
                                    )}
                                    {urlDoc?.length > 0 && !errors.urlDoc && (
                                        <p className="text-green-500 text-center font-semibold text-sm">Documento subido correctamente</p>
                                    )}
                                    {errors.urlDoc && (
                                        <p className="text-red-500 text-center font-semibold text-sm">{errors.urlDoc.message}</p>
                                    )}
                                    {!urlDoc?.[0] && <FileUp className="w-5 h-5 text-black" />}
                                    {!urlDoc?.[0] && <span className="text-sm text-gray-600 mt-1">Requisitos (PDF)</span>}
                                </label>

                                <label className="flex flex-col items-center justify-center w-full max-w-[220px] aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        multiple
                                        {...register('portada', {
                                            required: 'Se requiere una imagen',
                                            validate: {
                                                tamaño: (archivos) =>
                                                    archivos?.[0]?.size <= MAX_SIZE || 'La imagen supera los 10MB',
                                                tipo: (archivos) =>
                                                    /\.(jpg|jpeg|png|webp)$/i.test(archivos?.[0]?.name) ||
                                                    'El archivo debe ser una imagen (.jpg, .jpeg, .png, .webp)',
                                            },
                                        })}
                                    />
                                    {portada?.[0] && (
                                        <span className="text-sm text-center text-gray-700 mt-1 break-words w-full px-2 max-w-[220px]">
                                            {portada[0].name}
                                        </span>
                                    )}
                                    {portada?.length > 0 && !errors.portada && (
                                        <p className="text-green-500 text-center font-semibold text-sm">Imagen subida correctamente</p>
                                    )}
                                    {errors.portada && (
                                        <p className="text-red-500 text-center font-semibold text-sm">{errors.portada.message}</p>
                                    )}
                                    {!portada?.[0] && <Image className="w-5 h-5 text-black" />}
                                    {!portada?.[0] && <span className="text-sm text-gray-600 mt-1">Capturas</span>}
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-gray-400 hover:text-gray-900 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-indigo-200/50"
                            >
                                Actualizar Simulación
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditarSimulaciones;
