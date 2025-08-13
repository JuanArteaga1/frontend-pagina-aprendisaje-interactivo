import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useProyectos } from "../context/ProyectoContext";
import { Download, FileText, CalendarDays, Users, Video, Image } from "lucide-react";

const DetalleProyecto = () => {
    const { id } = useParams();
    const { Proyectos, TraerProyectos } = useProyectos();

    useEffect(() => {
        const proyectoExiste = Proyectos.some(p => p._id === id);
        if (!proyectoExiste) {
            TraerProyectos();
        }
    }, [id, Proyectos, TraerProyectos]);

    if (!Proyectos || Proyectos.length === 0) {
        return (
            <>
                <Navbar />
                <div className="p-8 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800">Cargando proyectos...</h2>
                </div>
            </>
        );
    }

    const proyecto = Proyectos.find(p => p._id === id);

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
    const rutaAPK = proyecto.urlArchivoapk?.replace(/\\/g, "/");
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
            <div className="p-8 max-w-6xl mx-auto space-y-8">
                {/* Encabezado con imagen y botón */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-gray-100">
                    {/* Imagen */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-xl shadow-md border-2 border-white">
                        <img
                            src={imagenURL}
                            alt={`Foto de ${proyecto.nombre_proyecto}`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Contenedor texto + botón */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-1 gap-4 w-full">
                        {/* Texto */}
                        <div className="flex-1 space-y-1">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                                {proyecto.nombre_proyecto}
                            </h1>
                            <p className="text-indigo-600 flex items-center gap-1 text-sm sm:text-base break-words">
                                <Users size={16} className="inline" />
                                {proyecto.autores.join(', ')}
                            </p>
                        </div>

                        {/* Botón */}
                        <button
                            onClick={handleDescarga}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-lg font-medium transition-all shadow-md hover:shadow-lg whitespace-nowrap hover:scale-110"
                        >
                            <Download size={20} /> Descargar APK
                        </button>
                    </div>
                </div>


                {/* Galería multimedia */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        <Video size={20} /> Galería Multimedia
                    </h3>
                    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {proyecto.video && (
                            <div className="flex-shrink-0 w-80 h-48 md:w-96 md:h-56 rounded-xl overflow-hidden shadow-md">
                                <iframe
                                    className="w-full h-full"
                                    src={proyecto.video.replace("watch?v=", "embed/")}
                                    title="Video de YouTube"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        {proyecto.imagenes?.map((img, idx) => {
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
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Detalles del Proyecto</h3>
                        <p className="text-gray-700 leading-relaxed">{proyecto.descripcion}</p>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-start gap-3">
                                <Users size={20} className="text-indigo-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-gray-800">Autores</h4>
                                    <p className="text-gray-600">{proyecto.autores.join(', ')}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <CalendarDays size={20} className="text-indigo-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-gray-800">Fecha de creación</h4>
                                    <p className="text-gray-600">
                                        {new Date(proyecto.fechaPublicacion).toLocaleString('es-CO', {
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
                        {proyecto.urlDoc ? (() => {
                            const rutaDoc = proyecto.urlDoc.replace(/\\/g, "/");
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

export default DetalleProyecto;