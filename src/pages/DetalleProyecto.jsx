import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useProyectos } from "../context/ProyectoContext";
import {
    Download,
    FileText,
    CalendarDays,
    Users,
    Video,
    X
} from "lucide-react";

const DetalleProyecto = () => {
    const { id } = useParams();
    const { Proyectos, TraerProyectos } = useProyectos();
    const [modalImagen, setModalImagen] = useState(null);
    const [modalVideo, setModalVideo] = useState(null);

    useEffect(() => {
        const proyectoExiste = Proyectos.some((p) => p._id === id);
        if (!proyectoExiste) {
            TraerProyectos();
        }
    }, [id, Proyectos, TraerProyectos]);

    if (!Proyectos || Proyectos.length === 0) {
        return (
            <>
                <Navbar />
                <div className="p-8 max-w-6xl mx-auto animate-pulse">
                    <h2 className="text-2xl font-bold text-gray-800">Cargando proyectos...</h2>
                </div>
            </>
        );
    }

    const proyecto = Proyectos.find((p) => p._id === id);

    if (!proyecto) {
        return (
            <>
                <Navbar />
                <div className="p-8 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-red-600">Proyecto no encontrado.</h2>
                </div>
            </>
        );
    }

    const rutaLimpia = proyecto.urlimg?.replace(/\\/g, "/");
    const imagenURL = `http://localhost:3000/uploads/${rutaLimpia?.split("uploads/")[1]}`;
    let archivoURL = "";
    if (proyecto.urlArchivoapk) {
        const rutaAPK = proyecto.urlArchivoapk.replace(/\\/g, "/");
        archivoURL = `http://localhost:3000/uploads/${rutaAPK.split("uploads/")[1]}`;
    }

    const handleDescarga = () => {
        const link = document.createElement("a");
        link.href = archivoURL;
        link.download = proyecto.nombre_proyecto + ".apk";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Navbar />
            <div className="p-8 max-w-7xl mx-auto space-y-8">

                {/* Primera fila: Foto portada y Nombres */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Foto portada */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Foto portada</h2>
                        <div
                            className="w-full h-64 overflow-hidden rounded-2xl shadow-lg border-4 border-white cursor-pointer hover:scale-105 transition-transform mx-auto max-w-sm"
                            onClick={() => setModalImagen(imagenURL)}
                        >
                            <img
                                src={imagenURL}
                                alt={`Foto de ${proyecto.nombre_proyecto}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Nombres */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nombres</h2>
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
                            {proyecto.nombre_proyecto}
                        </h1>
                        <div className="flex items-center gap-2 text-lg text-indigo-600">
                            <Users size={20} />
                            <span>{proyecto.autores.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-3">
                            <CalendarDays size={18} />
                            <span className="text-sm">
                                {new Date(proyecto.fechaPublicacion).toLocaleString("es-CO", {
                                    dateStyle: "long",
                                    timeStyle: "short",
                                    hour12: true,
                                    timeZone: "America/Bogota"
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Segunda fila: Información y Video YouTube */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Información */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Información</h2>
                        <p className="text-gray-700 leading-relaxed">{proyecto.descripcion}</p>
                    </div>

                    {/* Video YouTube / Galería */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Video size={20} /> Video YouTube
                        </h2>
                        <div className="space-y-4">
                            {proyecto.video && (
                                <div
                                    onClick={() => setModalVideo(proyecto.video)}
                                    className="w-full h-48 rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
                                >
                                    <video className="w-full h-full object-cover">
                                        <source src={proyecto.video} type="video/mp4" />
                                    </video>
                                </div>
                            )}
                            
                            {/* Galería de imágenes adicionales */}
                            {proyecto.imagenes && proyecto.imagenes.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto">
                                    {proyecto.imagenes.slice(0, 3).map((img, idx) => {
                                        const rutaLimpiaImg = img.replace(/\\/g, "/");
                                        const imagenURL = `http://localhost:3000/${rutaLimpiaImg}`;
                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => setModalImagen(imagenURL)}
                                                className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden shadow-sm cursor-pointer hover:scale-105 transition-transform"
                                            >
                                                <img
                                                    src={imagenURL}
                                                    alt={`Imagen ${idx}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tercera fila: Documento PDF y Descargue APK */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Documento PDF */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FileText size={20} /> Documento pdf
                        </h2>
                        {proyecto.urlDoc ? (() => {
                            const rutaDoc = proyecto.urlDoc.replace(/\\/g, "/");
                            const docURL = `http://localhost:3000/uploads/${rutaDoc.split("uploads/")[1]}`;
                            return (
                                <div className="text-center">
                                    <a
                                        href={docURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:scale-105"
                                    >
                                        <FileText size={18} />
                                        Ver documentación
                                    </a>
                                </div>
                            );
                        })() : (
                            <p className="text-gray-500 italic text-center">No hay documentación disponible</p>
                        )}
                    </div>

                    {/* Descargue APK */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Download size={20} /> Descargue apk
                        </h2>
                        {archivoURL ? (
                            <div className="text-center">
                                <button
                                    onClick={handleDescarga}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:scale-105"
                                >
                                    <Download size={18} />
                                    Descargar APK
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-center">No hay archivo APK disponible</p>
                        )}
                    </div>
                </div>

                {/* Todo más grande - Galería completa */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-gray-200">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Todo más grande</h2>
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                            {proyecto.nombre_proyecto}
                        </h1>
                        <p className="text-xl text-indigo-600">{proyecto.autores.join(", ")}</p>
                    </div>
                    
                    {/* Galería expandida */}
                    {proyecto.imagenes && proyecto.imagenes.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {proyecto.imagenes.map((img, idx) => {
                                const rutaLimpiaImg = img.replace(/\\/g, "/");
                                const imagenURL = `http://localhost:3000/${rutaLimpiaImg}`;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setModalImagen(imagenURL)}
                                        className="aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
                                    >
                                        <img
                                            src={imagenURL}
                                            alt={`Imagen ${idx}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Video grande si existe */}
                    {proyecto.video && (
                        <div className="mt-6">
                            <div
                                onClick={() => setModalVideo(proyecto.video)}
                                className="w-full max-w-4xl mx-auto h-64 md:h-96 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
                            >
                                <video className="w-full h-full object-cover">
                                    <source src={proyecto.video} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Imagen */}
            {modalImagen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <button
                            onClick={() => setModalImagen(null)}
                            className="absolute top-3 right-3 text-white hover:text-red-400"
                        >
                            <X size={30} />
                        </button>
                        <img src={modalImagen} alt="Vista ampliada" className="max-w-full max-h-[90vh] rounded-lg" />
                    </div>
                </div>
            )}

            {/* Modal Video */}
            {modalVideo && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <button
                            onClick={() => setModalVideo(null)}
                            className="absolute top-3 right-3 text-white hover:text-red-400"
                        >
                            <X size={30} />
                        </button>
                        <video controls autoPlay className="max-w-full max-h-[90vh] rounded-lg">
                            <source src={modalVideo} type="video/mp4" />
                        </video>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetalleProyecto;