import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UseSimulaciones } from "../context/SimulacionesContex";
import { Download, FileText, CalendarDays, Users, Video, Image } from "lucide-react";

const DetalleSimulacion = () => {
    const { id } = useParams();
    const { Simulaciones, TraerSimulaciones } = UseSimulaciones();
    const apiUrl = import.meta.env.VITE_RUTA1;

    useEffect(() => {
        if (!Simulaciones.some(s => s._id === id)) {
            TraerSimulaciones();
        }
    }, [id, Simulaciones, TraerSimulaciones]);

    if (!Simulaciones || Simulaciones.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-gray-600">Cargando simulación...</p>
                    </div>
                </div>
            </>
        );
    }

    const getYouTubeVideoId = (url) => {
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const simulacion = Simulaciones.find((s) => s._id === id);
    if (!simulacion) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Simulación no encontrada
                        </h2>
                        <p className="text-gray-600">La simulación que buscas no existe</p>
                    </div>
                </div>
            </>
        );
    }

    // URLs usando la variable de entorno (versión segura)
    const rutaLimpia = simulacion.urlimg?.replace(/\\/g, "/");
    const imagenURL = `${apiUrl}/uploads/${rutaLimpia?.split("uploads/")[1]}`;

    const rutaAPK = simulacion.urlArchivoapk?.replace(/\\/g, "/");
    const archivoURL = `${apiUrl}/uploads/${rutaAPK?.split("uploads/")[1]}`;

    const rutaDoc = simulacion.urlDoc?.replace(/\\/g, "/");
    const docURL = `${apiUrl}/uploads/${rutaDoc?.split("uploads/")[1]}`;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="flex flex-col xl:flex-row min-h-[700px]">
                            
                            {/* Left Section - Info */}
                            <div className="xl:w-2/5 p-8 sm:p-10 border-b xl:border-b-0 xl:border-r border-gray-200 bg-white">
                                <div className="flex flex-col h-full">
                                    
                                    {/* Header */}
                                    <div className="flex-shrink-0 mb-8">
                                        <div className="flex flex-col gap-6 items-center text-center">
                                            <div className="relative p-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl shadow-lg">
                                                <img
                                                    src={imagenURL}
                                                    alt={simulacion.nombre_proyecto}
                                                    className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl object-cover border-2 border-white shadow-lg"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h1 className="text-2xl sm:text-4xl font-bold mb-4 leading-tight text-gray-900">
                                                    {simulacion.nombre_proyecto}
                                                </h1>
                                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                                    {simulacion.autores.map((autor, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm"
                                                        >
                                                            <Users size={14} />
                                                            {autor}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm bg-gray-100 px-4 py-2 rounded-lg">
                                                    <CalendarDays size={16} />
                                                    {new Date(simulacion.fechaPublicacion).toLocaleDateString("es-CO", {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Descripción */}
                                    <div className="flex-1 mb-8">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                                            Descripción
                                        </h2>
                                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                            <p className="text-gray-700 leading-relaxed text-base text-center">
                                                {simulacion.descripcion}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Botones */}
                                    <div className="flex-shrink-0 space-y-4">
                                        <button
                                            onClick={() => {
                                                const link = document.createElement("a");
                                                link.href = archivoURL;
                                                link.download = simulacion.nombre_proyecto + ".apk";
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }}
                                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                                        >
                                            <Download size={20} />
                                            Descargar APK
                                        </button>
                                        
                                        {simulacion.urlDoc && (
                                            <a
                                                href={docURL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex items-center justify-center gap-3 border-2 border-indigo-500 hover:bg-indigo-500 text-indigo-600 hover:text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105"
                                            >
                                                <FileText size={20} />
                                                Ver Documentación
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Media */}
                            <div className="xl:w-3/5 p-8 sm:p-10 bg-gray-50">
                                <div className="h-full space-y-8">
                                    
                                    {/* Video */}
                                    {simulacion.youtubeLink && (() => {
                                        const videoId = getYouTubeVideoId(simulacion.youtubeLink);
                                        return videoId ? (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-md border-l-4 border-indigo-600">
                                                    <div className="p-2 bg-indigo-600 rounded-lg">
                                                        <Video size={20} className="text-white" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        Video Demostración
                                                    </h3>
                                                </div>
                                                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                                                    <iframe
                                                        className="w-full h-full"
                                                        src={`https://www.youtube.com/embed/${videoId}`}
                                                        title="Video de simulación"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div>
                                        ) : null;
                                    })()}

                                    {/* Galería */}
                                    {simulacion.imagenes && simulacion.imagenes.length > 0 && (
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-md border-l-4 border-yellow-500">
                                                <div className="p-2 bg-yellow-500 rounded-lg">
                                                    <Image size={20} className="text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    Capturas de Pantalla
                                                </h3>
                                            </div>
                                            
                                            {simulacion.imagenes.length > 2 ? (
                                                <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
                                                    {simulacion.imagenes.map((img, idx) => {
                                                        const rutaLimpiaImg = img.replace(/\\/g, "/");
                                                        const imagenURLGallery = `${apiUrl}/uploads/${rutaLimpiaImg.split("uploads/")[1]}`;
                                                        return (
                                                            <div key={idx} className="flex-shrink-0 w-56 h-40 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 hover:border-indigo-600 transition-all duration-300">
                                                                <img
                                                                    src={imagenURLGallery}
                                                                    alt={`Captura ${idx + 1}`}
                                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {simulacion.imagenes.map((img, idx) => {
                                                        const rutaLimpiaImg = img.replace(/\\/g, "/");
                                                        const imagenURLGallery = `${apiUrl}/uploads/${rutaLimpiaImg.split("uploads/")[1]}`;
                                                        return (
                                                            <div key={idx} className="aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 hover:border-indigo-500 transition-all duration-300">
                                                                <img
                                                                    src={imagenURLGallery}
                                                                    alt={`Captura ${idx + 1}`}
                                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Si no hay media */}
                                    {!simulacion.youtubeLink && (!simulacion.imagenes || simulacion.imagenes.length === 0) && (
                                        <div className="flex items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                                            <div className="text-center space-y-3">
                                                <div className="p-4 bg-gray-100 rounded-full inline-block">
                                                    <Image size={40} className="text-gray-500" />
                                                </div>
                                                <p className="font-medium">No hay contenido multimedia disponible</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetalleSimulacion;
