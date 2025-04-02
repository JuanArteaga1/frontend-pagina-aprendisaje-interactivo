import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./SubirSimulaciones.css";
import MenuLateral from "../components/MenuAdmi_Doc"
import { 
    FaFileUpload, // Icono de subida de archivos
    FaFilePdf,    // Icono de archivo PDF
    FaFileVideo,  // Icono de archivo de video
    FaCalendarAlt,// Icono de calendario para fecha
    FaUserEdit,   // Icono de edición de usuario
    FaSignOutAlt, // Icono de cerrar sesión
    FaSearch      // Icono de búsqueda
} from 'react-icons/fa';
// Componente principal para subir simulaciones
const SubirSimulaciones = () => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: '',       // Nombre de la simulación
        descripcion: '',  // Descripción de la simulación
        autores: '',      // Autores de la simulación
        fecha: '',        // Fecha de creación
        archivos: []      // Array para archivos subidos
    });

    // Manejador de cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Actualizar el estado del formulario manteniendo los otros campos
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Manejador de cambios en los inputs de archivos
    const handleFileChange = (e) => {
        // Actualizar el array de archivos con los nuevos archivos seleccionados
        setFormData(prev => ({
            ...prev,
            archivos: [...e.target.files]
        }));
    };

    // Manejador de envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto
        console.log('Datos de la simulación:', formData); // Mostrar datos en consola
        alert('Simulación enviada exitosamente'); // Mostrar mensaje de éxito
        // En una aplicación real, aquí se enviarían los datos al servidor
    };

    // Renderizado del componente
    return (
        <>
            {/* Barra de navegación superior */}
            <Navbar loggedIn={true} />
            
            {/* Contenedor principal con diseño flex */}
            <div className="flex h-screen bg-gray-50">
                {/* Menú lateral izquierdo para docentes */}
                <MenuLateral rol="docente" />
                
                {/* Área de contenido principal */}
                <div className="flex-1 p-4 overflow-auto">
                    {/* Contenedor centrado con ancho máximo */}
                    <div className="max-w-md mx-auto">
                        {/* Sección del formulario de simulaciones */}
                        <div className="bg-white p-3 rounded shadow mb-4">
                            {/* Títulos de sección */}
                            <h2 className="text-md font-semibold text-gray-800 mb-2">SIMULACIONES</h2>
                            <h3 className="text-sm font-medium text-blue-600 mb-3">SUBIR SIMULACIONES</h3>
                            
                            {/* Formulario principal */}
                            <form onSubmit={handleSubmit} className="space-y-3">
                                {/* Campo para el nombre */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Nombre:</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
                                        placeholder="Ingreso el nombre"
                                        required
                                    />
                                </div>
                                
                                {/* Campo para la descripción */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Descripción:</label>
                                    <textarea
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
                                        rows="2"
                                        placeholder="Descripción del proyecto"
                                    ></textarea>
                                </div>
                                
                                {/* Campo para los autores */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Autores:</label>
                                    <input
                                        type="text"
                                        name="autores"
                                        value={formData.autores}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
                                        placeholder="Nombres de los autores"
                                    />
                                </div>
                            </form>
                        </div>
                        
                        {/* Sección de fecha y archivos */}
                        <div className="bg-white p-3 rounded shadow mb-4">
                            {/* Selector de fecha */}
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Fecha:</h3>
                            <input
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded mb-3"
                            />
                            
                            {/* Sección para subir archivos */}
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Cargar archivos:</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {/* Opción para subir simulación */}
                                <label className="flex flex-col items-center p-2 border border-gray-300 rounded cursor-pointer">
                                    <FaFileUpload className="text-blue-500 mb-1" />
                                    <span className="text-xs">SIMULACIÓN</span>
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                                
                                {/* Opción para subir documentos */}
                                <label className="flex flex-col items-center p-2 border border-gray-300 rounded cursor-pointer">
                                    <FaFilePdf className="text-red-500 mb-1" />
                                    <span className="text-xs">DOCUMENTOS</span>
                                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" multiple onChange={handleFileChange} />
                                </label>
                                
                                {/* Opción para subir video */}
                                <label className="flex flex-col items-center p-2 border border-gray-300 rounded cursor-pointer">
                                    <FaFileVideo className="text-purple-500 mb-1" />
                                    <span className="text-xs">VIDEO</span>
                                    <input type="file" className="hidden" accept=".mp4,.mov,.avi" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                        
                        {/* Botones de acción */}
                        <div className="bg-white p-3 rounded shadow flex justify-between items-center">
                            <button 
                                type="submit" 
                                className="px-6 py-3 text-sm text-white bg-blue-500 rounded flex items-center"
                                onClick={handleSubmit}
                            >
                                <FaSearch className="mr-1" />
                                Subir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SubirSimulaciones;