import React, { useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import Alerta from "../components/AlertasDocente";
import { FaUserGraduate, FaIdCard, FaEnvelope, FaLock, FaChalkboardTeacher, FaSave } from 'react-icons/fa'
import { useForm } from "react-hook-form"
import { UseDocente } from "../context/DocenteContext"

const SubirDocente = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { sigout, errors: DocenteErrors, mensaje } = UseDocente()
    const [registroExitoso, setRegistroExitoso] = useState(false);

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                {/* Menú Lateral (no modificado) */}
                <div className="w-64 bg-gray-800 text-white">
                    <MenuLateral rol="admin" />
                </div>
                {/* Contenido principal con mejor manejo del zoom */}
                <div className="flex-1 p-4 md:p-6 overflow-auto">
                    {/* Tarjeta contenedora con mejor escalado */}
                    <div className="w-full max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 transform origin-top transition-all duration-300">
                        {/* Encabezado escalable */}
                        <div className="mb-6 md:mb-8">
                            <div className="flex items-center mb-2">
                                <FaChalkboardTeacher className="text-blue-600 text-2xl md:text-3xl mr-3 flex-shrink-0" />
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">REGISTRO DE DOCENTE</h2>
                            </div>
                            <p className="text-green-500 text-xs md:text-sm flex items-center ml-9 md:ml-10">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                                Acceso completo
                            </p>
                        </div>

                        {DocenteErrors.map((error, i) => (
                            <Alerta key={i} tipo="error" mensaje={error.msg} />
                        ))}
                        {mensaje && (
                            <Alerta tipo="exito" mensaje={mensaje} />
                            
                        )}

                        <form onSubmit={handleSubmit(async (values) => {
                            const resultado = await sigout(values);
                            if (resultado?.success) {
                                setRegistroExitoso(true);
                            }

                        })}
                            className="space-y-4 md:space-y-6">
                            {/* Sección 1: Información personal */}
                            <div className="space-y-4 md:space-y-5">
                                <h3 className="text-base md:text-lg font-semibold text-gray-700 border-b pb-2">
                                    Información Personal
                                </h3>

                                {/* Nombre completo */}
                                <div className="relative">
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <FaUserGraduate className="mr-2 text-blue-500 flex-shrink-0" />
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        {...register('Nombre', { required: true })}
                                        className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        placeholder="Ingrese el nombre completo"
                                    />
                                    {errors.Nombre && (<p className="text-red-500">Nombre es requerido</p>)}
                                </div>

                                {/* Identificación */}
                                <div className="relative">
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <FaIdCard className="mr-2 text-blue-500 flex-shrink-0" />
                                        Número de identificación
                                    </label>
                                    <input
                                        type="text"
                                        {...register('identificacion', { required: true })}

                                        className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        placeholder="Ej: 1234567890"
                                    />
                                    {errors.identificacion && (<p className="text-red-500">identificacion es requerido</p>)}

                                </div>
                            </div>

                            {/* Sección 2: Información institucional */}
                            <div className="space-y-4 md:space-y-5">
                                <h3 className="text-base md:text-lg font-semibold text-gray-700 border-b pb-2">
                                    Información Institucional
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                                    {/* Código del docente */}
                                    <div className="relative">
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 flex items-center">
                                            <FaIdCard className="mr-2 text-blue-500 flex-shrink-0" />
                                            Código del docente
                                        </label>
                                        <input
                                            type="text"
                                            name="codigo"
                                            {...register('Codigo', { required: true })}
                                            className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                            placeholder="Ej: PROF-001"
                                        />
                                        {errors.Codigo && (<p className="text-red-500">codigo es requerido</p>)}

                                    </div>
                                    {/* Correo institucional */}
                                    <div className="relative">
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 flex items-center">
                                            <FaEnvelope className="mr-2 text-blue-500 flex-shrink-0" />
                                            Correo institucional
                                        </label>
                                        <input
                                            type="email"
                                            name="correo"
                                            {...register('email', { required: true })}
                                            className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                            required
                                            placeholder="ejemplo@institucion.edu"
                                        />
                                        {errors.email && <p className="text-red-500">email es requerido</p>}

                                    </div>
                                </div>
                            </div>

                            {/* Sección 3: Credenciales */}
                            <div className="space-y-4 md:space-y-5">
                                <h3 className="text-base md:text-lg font-semibold text-gray-700 border-b pb-2">
                                    Credenciales de acceso
                                </h3>

                                <div className="relative">
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <FaLock className="mr-2 text-blue-500 flex-shrink-0" />
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        name="contrasena"
                                        {...register('contrasena', { required: true })}
                                        className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        required
                                        placeholder="••••••••"
                                    />
                                    {errors.contrasena && (<p className="text-red-500">contraseña es requerido</p>)}

                                </div>
                            </div>
                            <select {...register('rol', { required: true })}>
                                <option value="">Selecciona un rol</option>
                                <option value="Docente">Docente</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                            {errors.rol && (<p className="text-red-500">selecciones una opcion</p>)}


                            <select {...register('estado', { required: true })}>
                                <option value="">Selecciona un estado</option>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                            {errors.estado && (<p className="text-red-500">selecciones una opcion</p>)}


                            <input {...register('funcion', { required: true })} placeholder="Función que cumple" />
                            {errors.funcion && (<p className="text-red-500">funcion es requerido</p>)}


                            {/* Botones de acción */}
                            <div className="flex justify-between pt-6 md:pt-8 border-t border-gray-200">
                                <button
                                    type="submit"
                                    className="px-4 md:px-6 py-2 text-xs md:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center"
                                >
                                    <FaSave className="mr-2 flex-shrink-0" />
                                    Registrar Docente
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SubirDocente;