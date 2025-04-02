import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MenuLateral from "../components/MenuAdmi_Doc";
import {
    FaUserGraduate,
    FaIdCard,
    FaEnvelope,
    FaLock,
    FaChalkboardTeacher,
    FaSignOutAlt,
    FaSave
} from 'react-icons/fa';
const SubirDocente = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        codigo: '',
        correo: '',
        contrasena: '',
        identificacion: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del docente:', formData);
        alert('Docente registrado exitosamente');
    };

    return (
        <>
            <Navbar />
            
            <div className="flex h-screen bg-gradient-to-br from-blue-50 to-gray-50">
                <MenuLateral rol="admin" />

                {/* Contenido principal */}
                <div className="flex-1 p-6 overflow-auto">
                    {/* Tarjeta contenedora - tamaño ajustado */}
                    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        {/* Encabezado mejor estructurado */}
                        <div className="mb-8">
                            <div className="flex items-center mb-2">
                                <FaChalkboardTeacher className="text-blue-600 text-3xl mr-3" />
                                <h2 className="text-2xl font-bold text-gray-800">REGISTRO DE DOCENTE</h2>
                            </div>
                            <p className="text-green-500 text-sm flex items-center ml-10">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                Acceso completo
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Sección 1: Información personal */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                                    Información Personal
                                </h3>
                                
                                {/* Nombre completo */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <FaUserGraduate className="mr-2 text-blue-500" />
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        required
                                        placeholder="Ingrese el nombre completo"
                                    />
                                    <FaUserGraduate className="absolute left-3 top-9 text-gray-400" />
                                </div>

                                {/* Identificación */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <FaIdCard className="mr-2 text-blue-500" />
                                        Número de identificación
                                    </label>
                                    <input
                                        type="text"
                                        name="identificacion"
                                        value={formData.identificacion}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        placeholder="Ej: 1234567890"
                                    />
                                    <FaIdCard className="absolute left-3 top-9 text-gray-400" />
                                </div>
                            </div>

                            {/* Sección 2: Información institucional */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                                    Información Institucional
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Código del docente */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                            <FaIdCard className="mr-2 text-blue-500" />
                                            Código del docente
                                        </label>
                                        <input
                                            type="text"
                                            name="codigo"
                                            value={formData.codigo}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                            placeholder="Ej: PROF-001"
                                        />
                                        <FaIdCard className="absolute left-3 top-9 text-gray-400" />
                                    </div>

                                    {/* Correo institucional */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                            <FaEnvelope className="mr-2 text-blue-500" />
                                            Correo institucional
                                        </label>
                                        <input
                                            type="email"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                            required
                                            placeholder="ejemplo@institucion.edu"
                                        />
                                        <FaEnvelope className="absolute left-3 top-9 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Sección 3: Credenciales */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                                    Credenciales de acceso
                                </h3>
                                
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <FaLock className="mr-2 text-blue-500" />
                                        Contraseña 
                                    </label>
                                    <input
                                        type="password"
                                        name="contrasena"
                                        value={formData.contrasena}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        required
                                        placeholder="••••••••"
                                    />
                                    <FaLock className="absolute left-3 top-9 text-gray-400" />
                                </div>
                            </div>

                            {/* Botones de acción con mejor espaciado */}
                            <div className="flex justify-between pt-8 border-t border-gray-200">
                                 <button
                                    type="submit"
                                    className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center"
                                >
                                    <FaSave className="mr-2" />
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