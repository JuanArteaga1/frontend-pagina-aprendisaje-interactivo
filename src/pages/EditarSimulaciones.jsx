import React, { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import { useLogin } from "../context/LoginContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { UseSimulaciones } from "../context/SimulacionesContex";
import axios from "axios";
import Alerta from "../components/AlertasDocente";
import { UseCategoria } from "../context/CategoriaContext"

import {
    FaAndroid,
    FaFileCode,
    FaImage,
    FaUpload,
} from "react-icons/fa";

function EditarSimulaciones() {
    const location = useLocation();
    const navigate = useNavigate();
    const simulacion = location.state?.simulacion;
    const { Usuario } = useLogin();
    const { errors: SimulacionesErrors, mensaje,ActualizarSimulaciones } = UseSimulaciones()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [simulacionActual, setSimulacionActual] = useState(null);
    const { id } = useParams();
    const { TraerCategoria, Categoria } = UseCategoria()

    useEffect(() => {
        TraerCategoria();
        console.log(Categoria)
    }, []);


    useEffect(() => {
        if (simulacion) {
            setSimulacionActual(simulacion);

            const fechaFormateada = new Date(simulacion.fechaPublicacion).toISOString().split("T")[0];

            setValue("nombre_proyecto", simulacion.nombre_proyecto);
            setValue("descripcion", simulacion.descripcion);
            setValue("autores", simulacion.autores);
            setValue("fechaPublicacion", fechaFormateada);
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
            const respuesta = await ActualizarSimulaciones(id,formData)
            if (respuesta?.success) {
                navigate("/misproyectos", {
                    state: {
                        mensaje: "Podcast actualizado correctamente",
                        tipo: "success"
                    }
                });
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
            <div className="flex-1 p-4 overflow-auto">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-4">Editar Simulación</h2>
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        {SimulacionesErrors.map((error, i) => (
                        <Alerta key={i} tipo="error" mensaje={error.msg} />
                    ))}


                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                                type="date"
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
                                    <FaAndroid className="text-green-500 text-xl mb-1" />
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
                                    <FaFileCode className="text-blue-500 text-xl mb-1" />
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
                                    <FaImage className="text-purple-500 text-xl mb-1" />
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
                                    Actualizar Simulacion
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarSimulaciones;
