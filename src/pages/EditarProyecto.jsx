import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useProyectos } from "../context/ProyectoContext"
import { useForm } from "react-hook-form";

// Tamaño máximo permitido para archivos: 10 megabytes
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function EditarProyecto() {
    // Obtiene el estado de navegación, donde se espera que venga el proyecto a editar
    const location = useLocation();

    // Hook de navegación para redireccionar al usuario después de editar
    const navigate = useNavigate();

    // Extrae el objeto del proyecto desde la navegación (viene desde otra vista)
    const proyecto = location.state?.proyecto;

    // Obtiene funciones y datos del contexto de proyectos (incluye errores y mensajes)
    const { sigout, Proyectos, errors: ProyectosErrors, mensaje } = useProyectos();

    // Hook de react-hook-form para manejar el formulario y sus validaciones
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Función que se ejecuta al enviar el formulario
    const onSubmit = async (data) => {
        try {
            // Envía una petición PUT al backend para actualizar el proyecto existente
            await axios.put(`http://localhost:3001/api/proyectos/${proyecto._id}`, {
                nombre: data.nombre_proyecto,       // Nuevo nombre del proyecto
                descripcion: data.descripcion,      // Nueva descripción
                url: data.urlArchivoapk             // URL del archivo APK (si se actualiza)
            });

            // Muestra un mensaje de éxito y redirige a la vista de "Mis Proyectos"
            alert("Proyecto actualizado con éxito");
            navigate("/misproyectos");
        } catch (error) {
            // Muestra un error en consola y alerta si la actualización falla
            console.error("Error al actualizar el proyecto:", error);
            alert("Hubo un error al actualizar el proyecto");
        }
    };

    // Función para cancelar la edición y regresar a la lista de proyectos
    const handleCancel = () => {
        navigate("/misproyectos");
    };

    // Si no se recibe un proyecto por props, muestra un mensaje de error
    if (!proyecto) {
        return <p>No se encontró el proyecto..</p>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <MenuLateral rol="docente" />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Editar Proyecto</h2>
                        </div>


                    {ProyectosErrors.map((error, i) => (
                        <p key={i} className="text-red-500">{error.msg}</p>
                    ))}
                    {mensaje && (
                        <p className="text-green-500">{mensaje}</p>
                    )}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-semibold text-gray-800 mb-1">Nombre del proyecto</label>
                                    <input
                                        defaultValue={proyecto.nombre_proyecto}
                                        {...register('nombre_proyecto', { required: true })}
                                        className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-1"
                                    />
                                    {errors.nombre_proyecto && <p className="text-red-500">Nombre es requerido</p>}
                                </div>

                                <div>
                                    <label className="block font-semibold text-gray-800 mb-1">Autores</label>
                                    <input
                                        defaultValue={proyecto.autores}
                                        {...register('autores', { required: true })}
                                        className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-1"
                                    />
                                    {errors.autores && <p className="text-red-500">Autor es requerido</p>}
                                </div>

                                <div>
                                    <label className="block font-semibold text-gray-800 mb-1">Fecha de realización</label>
                                    <input
                                        defaultValue={proyecto.fechaPublicacion?.substring(0, 10)}
                                        type="date"
                                        {...register('fechaPublicacion', { required: true })}
                                        className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                                    />
                                    {errors.fechaPublicacion && <p className="text-red-500">La fecha es requerida</p>}
                                </div>

                                <div>
                                    <label className="block font-semibold text-gray-800 mb-1">Categoría</label>
                                    <select
                                        defaultValue={proyecto.categoriaId || ""}
                                        {...register('categoriaId', { required: true })}
                                        className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                                    >
                                        <option value="">Seleccionar categoría</option>
                                        <option value="software">Software</option>
                                        <option value="hardware">Hardware</option>
                                        <option value="investigacion">Investigación</option>
                                    </select>
                                    {errors.categoriaId && <p className="text-red-500">Categoría es requerida</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block font-semibold text-gray-800 mb-1">Descripción</label>
                                    <textarea
                                        defaultValue={proyecto.descripcion}
                                        {...register('descripcion', { required: true })}
                                        rows="4"
                                        className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                                    />
                                    {errors.descripcion && <p className="text-red-500">Descripción es requerida</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-800 mb-1">Materia</label>
                                <select
                                    defaultValue={proyecto.materia || ""}
                                    {...register('materia', { required: true })}
                                    className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                                >
                                    <option value="">Seleccionar materia</option>
                                    <option value="Fisica">Física</option>
                                    <option value="ingenieria civil">Ingeniería Civil</option>
                                    <option value="Matematicas">Matemáticas</option>
                                </select>
                                {errors.materia && <p className="text-red-500">Materia es requerida</p>}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-base font-semibold text-gray-800">Cargar Archivos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".mp3,audio/*"
                                            {...register('urlArchivoapk', {
                                                validate: {
                                                    tamaño: (archivos) => !archivos[0] || archivos[0].size <= MAX_SIZE || 'APK supera los 10MB',
                                                }
                                            })}
                                        />
                                        <span className="text-3xl">🪷</span>
                                        <span className="text-sm text-gray-600 mt-1">Subir APK</span>
                                        {errors.urlArchivoapk && <p className="text-red-500">{errors.urlArchivoapk.message}</p>}
                                    </label>

                                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            {...register('portada', {
                                                validate: {
                                                    tamaño: (archivos) => !archivos[0] || archivos[0].size <= MAX_SIZE || 'Imagen supera los 10MB',
                                                }
                                            })}
                                        />
                                        <span className="text-3xl">📈</span>
                                        <span className="text-sm text-gray-600 mt-1">Subir IMG</span>
                                        {errors.portada && <p className="text-red-500">{errors.portada.message}</p>}
                                    </label>

                                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                            {...register('urlDoc', {
                                                validate: {
                                                    tamaño: (archivos) => !archivos[0] || archivos[0].size <= MAX_SIZE || 'Documento supera los 10MB',
                                                }
                                            })}
                                        />
                                        <span className="text-3xl">📄</span>
                                        <span className="text-sm text-gray-600 mt-1">Subir PDF</span>
                                        {errors.urlDoc && <p className="text-red-500">{errors.urlDoc.message}</p>}
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
                                    Actualizar Proyecto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EditarProyecto;
