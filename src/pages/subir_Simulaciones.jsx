import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MenuLateral from "../components/MenuAdmi_Doc";
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
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        autores: '',
        fecha: '',
        apk: null,          // Archivo APK principal
        requisitos: null,   // Documento de requisitos
        capturas: []        // Capturas de pantalla
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (tipo, files) => {
        const validaciones = {
            apk: file => file.type === 'application/vnd.android.package-archive',
            requisitos: file => file.type === 'application/pdf',
            capturas: file => file.type.startsWith('image/')
        };

        const archivosValidos = Array.from(files).filter(validaciones[tipo]);
        
        if (archivosValidos.length === 0) {
            alert(`Formato no válido para ${tipo}`);
            return;
        }

        setFormData(prev => ({
            ...prev,
            [tipo]: tipo === 'capturas' ? [...prev[tipo], ...archivosValidos] : archivosValidos[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.apk) {
            alert("Debe subir un archivo APK");
            return;
        }
        console.log('Datos del APK:', formData);
        alert('APK enviado exitosamente');
    };

    const removeFile = (tipo, index) => {
        setFormData(prev => {
            if (tipo === 'capturas') {
                return { ...prev, capturas: prev.capturas.filter((_, i) => i !== index) };
            }
            return { ...prev, [tipo]: null };
        });
    };

    return (
        <>
            <Navbar loggedIn={true} />
            <div className="flex h-screen bg-gray-50">
                <MenuLateral rol="docente" />
                
                <div className="flex-1 p-4 overflow-auto">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white p-3 rounded shadow mb-4">
                            <h2 className="text-md font-semibold text-gray-800 mb-2">APLICACIONES ANDROID</h2>
                            <h3 className="text-sm font-medium text-green-600 mb-3">SUBIR APK</h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Nombre del APK:</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
                                        placeholder="Ej: MiAplicación v1.0"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Descripción técnica:</label>
                                    <textarea
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
                                        rows="2"
                                        placeholder="Especificaciones técnicas requeridas"
                                        required
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Desarrolladores:</label>
                                    <input
                                        type="text"
                                        name="autores"
                                        value={formData.autores}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
                                        placeholder="Equipo de desarrollo"
                                        required
                                    />
                                </div>

                                <div className="bg-white p-3 rounded shadow mb-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Fecha de compilación:</h3>
                                    <input
                                        type="date"
                                        name="fecha"
                                        value={formData.fecha}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded mb-3"
                                        required
                                    />
                                    
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Archivos requeridos:</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {/* APK Principal */}
                                        <label className="flex flex-col items-center p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                                            <FaAndroid className="text-green-500 text-xl mb-1" />
                                            <span className="text-xs text-center">APK Principal</span>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept=".apk"
                                                onChange={(e) => handleFileChange('apk', e.target.files)}
                                            />
                                            {formData.apk && (
                                                <div className="text-xs mt-1 text-green-600">
                                                    {formData.apk.name}
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeFile('apk')}
                                                        className="ml-1 text-red-500"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}
                                        </label>
                                        
                                        {/* Requisitos */}
                                        <label className="flex flex-col items-center p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                                            <FaFileCode className="text-blue-500 text-xl mb-1" />
                                            <span className="text-xs text-center">Requisitos (PDF)</span>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept=".pdf"
                                                onChange={(e) => handleFileChange('requisitos', e.target.files)}
                                            />
                                            {formData.requisitos && (
                                                <div className="text-xs mt-1 text-blue-600">
                                                    {formData.requisitos.name}
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeFile('requisitos')}
                                                        className="ml-1 text-red-500"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}
                                        </label>
                                        
                                        {/* Capturas */}
                                        <label className="flex flex-col items-center p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                                            <FaImage className="text-purple-500 text-xl mb-1" />
                                            <span className="text-xs text-center">Capturas</span>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => handleFileChange('capturas', e.target.files)}
                                            />
                                            {formData.capturas.length > 0 && (
                                                <div className="text-xs mt-1 text-purple-600">
                                                    {formData.capturas.length} imágenes
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                {/* Vista previa de capturas */}
                                {formData.capturas.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-xs font-medium text-gray-600 mb-2">Vista previa de capturas:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.capturas.map((file, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Captura ${index + 1}`}
                                                        className="w-16 h-16 object-cover rounded border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile('capturas', index)}
                                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-white p-3 rounded shadow flex justify-between items-center">
                                    <button 
                                        type="submit" 
                                        className="px-6 py-3 text-sm text-white bg-blue-500 rounded flex items-center hover:bg-blue-600 transition-colors"
                                    >
                                        <FaUpload className="mr-1" />
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