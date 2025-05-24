import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UseSimulaciones } from "../context/SimulacionesContex";
import { Download, FileText, CalendarDays, Users, Video, Image } from "lucide-react";

const DetalleSimulacion = () => {
    const { id } = useParams();
    const { Simulaciones, TraerSimulaciones } = UseSimulaciones();

    useEffect(() => {
        const existe = Simulaciones.some(s => s._id === id);
        if (!existe) TraerSimulaciones();
    }, [id, Simulaciones, TraerSimulaciones]);

    if (!Simulaciones || Simulaciones.length === 0) {
        return (
            <>
                <Navbar />
                <div className="p-8 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800">Cargando simulaciones...</h2>
                </div>
            </>
        );
    }

    const simulacion = Simulaciones.find(s => s._id === id);

    if (!simulacion) {
        return (
            <>
                <Navbar />
                <div className="p-8 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-red-600">Simulación no encontrada.</h2>
                </div>
            </>
        );
    }

    const rutaLimpia = simulacion.urlimg?.replace(/\\/g, "/");
    const imagenURL = `http://localhost:3000/uploads/${rutaLimpia?.split("uploads/")[1]}`;

    const rutaAPK = simulacion.urlArchivoapk?.replace(/\\/g, "/");
    const archivoURL = `http://localhost:3000/uploads/${rutaAPK.replace(/\\/g, "/").split("uploads/")[1]}`;

    return (
        <>
            <Navbar />
            <div className="p-8 max-w-6xl mx-auto space-y-8">
                {/* Header con imagen y botón */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-6 border border-gray-100">
                    <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-xl shadow-md border-2 border-white">
                        <img 
                            src={imagenURL} 
                            alt={`Foto de ${simulacion.nombre_proyecto}`} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <h1 className="text-3xl font-bold text-gray-800">{simulacion.nombre_proyecto}</h1>
                        <p className="text-indigo-600 flex items-center gap-1">
                            <Users size={16} className="inline" />
                            {simulacion.autores.join(', ')}
                        </p>
                    </div>
                    
                    <button
                        onClick={() => {
                            const link = document.createElement("a");
                            link.href = archivoURL;
                            link.download = simulacion.nombre_proyecto + ".apk";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl text-lg font-medium transition-all shadow-md hover:shadow-lg"
                    >
                        <Download size={20} /> Descargar APK
                    </button>
                </div>

                {/* Galería multimedia */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        <Video size={20} /> Galería Multimedia
                    </h3>
                    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {simulacion.video && (
                            <div className="flex-shrink-0 w-80 h-48 md:w-96 md:h-56 rounded-xl overflow-hidden shadow-md">
                                <video controls className="w-full h-full object-cover">
                                    <source src={simulacion.video} type="video/mp4" />
                                    Tu navegador no soporta el video.
                                </video>
                            </div>
                        )}
                        {simulacion.imagenes?.map((img, idx) => {
                            const rutaLimpiaImg = img.replace(/\\/g, "/");
                            const imagenURL = `http://localhost:3000/${rutaLimpiaImg}`;
                            return (
                                <div key={idx} className="flex-shrink-0 w-80 h-48 md:w-96 md:h-56 rounded-xl overflow-hidden shadow-md">
                                    <img 
                                        src={imagenURL} 
                                        alt={`Imagen ${idx}`} 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contenido informativo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Descripción principal */}
                    <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sobre esta aplicación</h3>
                        <p className="text-gray-700 leading-relaxed">{simulacion.descripcion}</p>
                        
                        <div className="mt-6 space-y-3">
                            <div className="flex items-start gap-3">
                                <Users size={20} className="text-indigo-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-gray-800">Autores</h4>
                                    <p className="text-gray-600">{simulacion.autores.join(', ')}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <CalendarDays size={20} className="text-indigo-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-gray-800">Fecha de creación</h4>
                                    <p className="text-gray-600">
                                        {new Date(simulacion.fechaPublicacion).toLocaleString('es-CO', {
                                            dateStyle: 'long',
                                            timeStyle: 'short',
                                            hour12: true,
                                            timeZone: 'America/Bogota'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Documentación */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FileText size={20} /> Documentación
                        </h3>
                        {simulacion.urlDoc ? (() => {
                            const rutaDoc = simulacion.urlDoc.replace(/\\/g, "/");
                            const docURL = `http://localhost:3000/uploads/${rutaDoc.split("uploads/")[1]}`;
                            return (
                                <a 
                                    href={docURL} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                >
                                    <FileText size={18} />
                                    Ver documentación completa
                                </a>
                            );
                        })() : (
                            <p className="text-gray-500 italic">No hay documentación disponible</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetalleSimulacion;