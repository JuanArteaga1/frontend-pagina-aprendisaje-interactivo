import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./SubirInvestigaciones.css";
import subirInvestigacionesImg from "../img/Subir_Investigaciones.jpg"; // Importa la imagen correctamente
import MenuLateral from "../components/MenuAdmi_Doc"
import { 
    FaFileUpload,  // Icono para subir archivos
    FaFilePdf,     // Icono para archivos PDF
    FaImage,       // Icono para imágenes
    FaCalendarAlt, // Icono para calendario/fecha
    FaUserEdit,    // Icono para edición de usuarios
    FaPaperclip    // Icono de clip para adjuntar
} from 'react-icons/fa';
  
// Componente principal para subir investigaciones
const SubirInvestigaciones = () => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        titulo: '',       // Título de la investigación
        descripcion: '',  // Descripción detallada
        autores: '',      // Nombres de los autores
        fecha: '',        // Fecha de la investigación
        imagen: null,     // Archivo de imagen
        archivo: null     // Archivo PDF
    });

    // Manejador para cambios en los campos de texto
    const handleChange = (e) => {
        // Extraer nombre y valor del campo modificado
        const { name, value } = e.target;
        // Actualizar el estado manteniendo los valores anteriores
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Manejador para cambios en los campos de archivo
    const handleFileChange = (e) => {
        // Extraer nombre y archivos seleccionados
        const { name, files } = e.target;
        // Actualizar el estado con el primer archivo seleccionado
        setFormData(prev => ({
            ...prev,
            [name]: files[0]
        }));
    };

    // Manejador para el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir comportamiento por defecto
        // Mostrar datos en consola (para desarrollo)
        console.log('Datos de la investigación:', formData);
        // Mostrar alerta de confirmación
        alert('Investigación subida correctamente');
        // Aquí normalmente se enviarían los datos al servidor
    };

    // Renderizado del componente
    return (
        <>
            {/* Barra de navegación superior */}
            <Navbar loggedIn={true} />
            
            {/* Contenedor principal con diseño flex */}
            <div className="flex h-screen bg-gray-50">
                {/* Menú lateral para docentes */}
                <MenuLateral rol="docente" />
                
                {/* Contenido principal del formulario */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="max-w-3xl mx-auto">
                         {/* Contenedor del formulario */}
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            {/* Título del formulario */}
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">SUBIR INVESTIGACIÓN</h2>
                            
                            {/* Formulario principal */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Sección de información básica */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Campo para el título */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Título:</label>
                                        <input
                                            type="text"
                                            name="titulo"
                                            value={formData.titulo}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                            placeholder="Ingrese el título de la investigación"
                                            required
                                        />
                                    </div>
                                    
                                    {/* Campo para la descripción */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
                                        <textarea
                                            name="descripcion"
                                            value={formData.descripcion}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                            rows="4"
                                            placeholder="Descripción detallada de la investigación"
                                            required
                                        ></textarea>
                                    </div>
                                    
                                    {/* Campo para los autores */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                            <FaUserEdit className="mr-2 text-blue-500" />
                                            Autores:
                                        </label>
                                        <input
                                            type="text"
                                            name="autores"
                                            value={formData.autores}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                            placeholder="Nombres de los autores"
                                        />
                                    </div>
                                    
                                    {/* Campo para la fecha */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                            <FaCalendarAlt className="mr-2 text-blue-500" />
                                            Fecha:
                                        </label>
                                        <input
                                            type="date"
                                            name="fecha"
                                            value={formData.fecha}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>
                                </div>
                                
                                {/* Sección para subir archivos */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-700">Subir archivos:</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Área para subir imagen */}
                                        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer">
                                            <FaImage className="text-3xl text-blue-500 mb-2" />
                                            <span className="font-medium">IMAGEN DE PORTADA</span>
                                            <span className="text-xs text-gray-500 mt-1">(JPG, PNG)</span>
                                            <input
                                                type="file"
                                                name="imagen"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        
                                        {/* Área para subir PDF */}
                                        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer">
                                            <FaFilePdf className="text-3xl text-red-500 mb-2" />
                                            <span className="font-medium">DOCUMENTO PDF</span>
                                            <span className="text-xs text-gray-500 mt-1">(Artículo completo)</span>
                                            <input
                                                type="file"
                                                name="archivo"
                                                className="hidden"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                
                                {/* Botón para enviar el formulario */}
                                <div className="pt-4 flex justify-center">
                                    <button
                                        type="submit"
                                        className="px-7 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center"
                                    >
                                        <FaPaperclip className="mr-2" />
                                        Subir Investigación
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
export default SubirInvestigaciones;