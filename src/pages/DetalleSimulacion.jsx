import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UseSimulaciones } from "../context/SimulacionesContex";


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
                <div className="p-5 max-w-6xl mx-auto">
                    <h2 className="text-xl font-bold">Cargando simulaciones...</h2>
                </div>
            </>
        );
    }

    const simulacion = Simulaciones.find(s => s._id === id);

    if (!simulacion) {
        return (
            <>
                <Navbar />
                <div className="p-5 max-w-6xl mx-auto">
                    <h2 className="text-xl font-bold">Simulacion no encontrada.</h2>
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
            <div className="p-5 max-w-6xl mx-auto">
                <div className="flex flex-col gap-8">
                    {/* Información principal del proyecto */}
                    <div className="bg-gray-50 p-5 rounded-lg shadow-md flex justify-between items-center">
                        <div className="w-36 h-36">
                            <img src={imagenURL} alt={`Foto de ${simulacion.nombre_proyecto}`} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex flex-col ml-4">
                            <h2 className="text-xl font-bold">{simulacion.nombre_proyecto}</h2>
                            <p className="text-sm text-gray-600">{simulacion.autores.join(', ')}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    // Crear enlace de descarga dinámicamente
                                    const link = document.createElement("a");
                                    link.href = archivoURL;
                                    link.download = simulacion.nombre_proyecto + ".apk";
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500"
                            >
                                Descargar
                            </button>
                        </div>
                    </div>

                    {/* Sección de galería: video e imágenes */}
                    <div className="flex overflow-x-auto gap-5 pb-4">
                        {simulacion.video && (
                            <div className="flex-shrink-0 w-96 h-56 flex justify-center items-center">
                                <video controls className="w-full h-full object-cover rounded-lg">
                                    <source src={simulacion.video} type="video/mp4" />
                                    Tu navegador no soporta el elemento de video.
                                </video>
                            </div>
                        )}
                        {simulacion.imagenes?.map((img, idx) => {
                            const rutaLimpiaImg = img.replace(/\\/g, "/");
                            const imagenURL = `http://localhost:3000/${rutaLimpiaImg}`;
                            return (
                                <div key={idx} className="flex-shrink-0 w-96 h-56">
                                    <img src={imagenURL} alt={`Imagen ${idx}`} className="w-full h-full object-cover rounded-lg" />
                                </div>
                            );
                        })}
                    </div>

                    {/* Sección de descripción y documentación */}
                    <div className="flex justify-between gap-10">
                        <div className="w-2/3">
                            <h3 className="text-lg font-semibold mb-2">Sobre esta aplicación:</h3>
                            <p className="text-base">{simulacion.descripcion}</p>
                            <p className="mt-2"><strong>Autores:</strong> {simulacion.autores.join(', ')}</p>
                            <p className="mt-2"><strong>Fecha de creación:</strong> {simulacion.fechaPublicacion}</p>
                        </div>
                        <div className="w-1/3">
                            <h3 className="text-lg font-semibold mb-2">Documentación:</h3>
                            {/* Mostrar botón si existe la URL de documentación */}
                            {simulacion.urlDoc ? (() => {
                                const rutaDoc = simulacion.urlDoc.replace(/\\/g, "/");
                                const docURL = `http://localhost:3000/uploads/${rutaDoc.split("uploads/")[1]}`;
                                return (
                                    <a href={docURL} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline text-sm">
                                        Ver documentación
                                    </a>
                                );
                            })() : (
                                <p className="text-base mb-2">No hay documentación disponible.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetalleSimulacion;
