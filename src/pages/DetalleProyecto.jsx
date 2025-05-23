import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Para acceder al parámetro `id` de la URL
import Navbar from "../components/Navbar";
import { useProyectos } from "../context/ProyectoContext"; // Hook personalizado para acceder al contexto
import { Download } from "lucide-react"; // Asegúrate de tener lucide-react instalado

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
    const archivoURL = `http://localhost:3000/uploads/${rutaAPK.replace(/\\/g, "/").split("uploads/")[1]}`;

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
            <div className="p-8 max-w-6xl mx-auto space-y-10">
                {/* Encabezado del Proyecto */}
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6">
                    <div className="w-36 h-36">
                        <img src={imagenURL} alt={`Foto de ${proyecto.nombre_proyecto}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-800">{proyecto.nombre_proyecto}</h2>
                        <p className="text-base text-gray-500 mt-1">{proyecto.autores.join(', ')}</p>
                    </div>
                    <button
                        onClick={handleDescarga}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg text-lg transition"
                    >
                        <Download size={20} /> Descargar APK
                    </button>
                </div>

                {/* Galería */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Galería</h3>
                    <div className="flex overflow-x-auto gap-5 pb-4">
                        {proyecto.video && (
                            <div className="flex-shrink-0 w-96 h-56">
                                <video controls className="w-full h-full object-cover rounded-lg">
                                    <source src={proyecto.video} type="video/mp4" />
                                    Tu navegador no soporta el video.
                                </video>
                            </div>
                        )}
                        {proyecto.imagenes?.map((img, idx) => {
                            const rutaLimpiaImg = img.replace(/\\/g, "/");
                            const imagenURL = `http://localhost:3000/${rutaLimpiaImg}`;
                            return (
                                <div key={idx} className="flex-shrink-0 w-96 h-56">
                                    <img src={imagenURL} alt={`Imagen ${idx}`} className="w-full h-full object-cover rounded-lg" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Información y Documentación */}
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="md:w-2/3">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Sobre esta aplicación</h3>
                        <p className="text-lg text-gray-700">{proyecto.descripcion}</p>
                        <p className="mt-4 text-lg"><strong>Autores:</strong> {proyecto.autores.join(', ')}</p>
                        <p className="mt-2 text-lg">
                            <strong>Fecha de creación:</strong>{" "}
                            {new Date(proyecto.fechaPublicacion).toLocaleString('es-CO', {
                                dateStyle: 'long',
                                timeStyle: 'short',
                                hour12: true,
                                timeZone: 'America/Bogota'
                            })}
                        </p>
                    </div>
                    <div className="md:w-1/3">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Documentación</h3>
                        {proyecto.urlDoc ? (() => {
                            const rutaDoc = proyecto.urlDoc.replace(/\\/g, "/");
                            const docURL = `http://localhost:3000/uploads/${rutaDoc.split("uploads/")[1]}`;
                            return (
                                <a href={docURL} target="_blank" rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-lg">
                                    Ver documentación
                                </a>
                            );
                        })() : (
                            <p className="text-lg text-gray-600">No hay documentación disponible.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetalleProyecto;