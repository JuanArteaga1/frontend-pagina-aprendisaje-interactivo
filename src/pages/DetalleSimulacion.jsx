import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UseSimulaciones } from "../context/SimulacionesContex";
import { Download, FileText, CalendarDays, Users, Video } from "lucide-react";

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
                <div className="p-8 max-w-6xl mx-auto">
                    <h2 className="text-xl font-bold text-gray-800 animate-pulse">
                        Cargando simulaciones...
                    </h2>
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
                <div className="p-8 max-w-6xl mx-auto">
                    <h2 className="text-xl font-bold text-red-600">
                        Simulación no encontrada.
                    </h2>
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
            <div className="p-6 max-w-4xl mx-auto space-y-8">

                {/* Imagen y autores */}
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 text-center transition-transform duration-300 hover:scale-[1.03]">
                    <img
                        src={imagenURL}
                        alt={simulacion.nombre_proyecto}
                        className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-indigo-200"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">
                        {simulacion.nombre_proyecto}
                    </h1>
                    <div className="flex justify-center flex-wrap gap-2 mt-4">
                        {simulacion.autores.map((autor, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors flex items-center gap-1"
                            >
                                <Users size={16} /> {autor}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Video */}
                {simulacion.youtubeLink && (() => {
                    const videoId = getYouTubeVideoId(simulacion.youtubeLink);
                    return videoId ? (
                        <div className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-transform hover:scale-[1.02]">
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
                                <Video size={20} /> Galería Multimedia
                            </h3>
                            <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-md">
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

                {/* Sobre esta aplicación */}
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-transform hover:scale-[1.02]">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Sobre esta aplicación</h3>
                    <p className="text-gray-700 text-base">{simulacion.descripcion}</p>
                    <div className="mt-4 flex items-center gap-2 text-gray-600 text-sm">
                        <CalendarDays size={18} className="text-indigo-600" />
                        {new Date(simulacion.fechaPublicacion).toLocaleString("es-CO", {
                            dateStyle: "long",
                            timeStyle: "short",
                            hour12: true,
                            timeZone: "America/Bogota",
                        })}
                    </div>
                </div>

                {/* Documentación */}
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-transform hover:scale-[1.02]">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FileText size={20} /> Documentación
                    </h3>
                    {simulacion.urlDoc ? (
                        <a
                            href={docURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-base font-medium transition-colors"
                        >
                            <FileText size={18} /> Ver documentación completa
                        </a>
                    ) : (
                        <p className="text-gray-500 italic text-base">No hay documentación disponible</p>
                    )}
                </div>

                {/* Botón de descarga */}
                <div className="text-center">
                    <button
                        onClick={() => {
                            const link = document.createElement("a");
                            link.href = archivoURL;
                            link.download = simulacion.nombre_proyecto + ".apk";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                        className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <Download size={22} /> Descargar APK
                    </button>
                </div>
            </div>
        </>
    );
};

export default DetalleSimulacion;