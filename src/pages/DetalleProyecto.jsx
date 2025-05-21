import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Para acceder al parámetro `id` de la URL
import Navbar from "../components/Navbar";
import { useProyectos } from "../context/ProyectoContext"; // Hook personalizado para acceder al contexto

const DetalleProyecto = () => {
    const { id } = useParams(); // Obtener el ID del proyecto desde la URL
    const { Proyectos, TraerProyectos } = useProyectos(); // Obtener lista de proyectos y función para traerlos
    
    useEffect(() => {
        // Si el proyecto no está en el estado, se vuelve a cargar
        const proyectoExiste = Proyectos.some(p => p._id === id);
        if (!proyectoExiste) {
            TraerProyectos(); // Cargar proyectos desde la API si no se encuentra el actual
        }
    }, [id, Proyectos, TraerProyectos]);

    // Mientras no se cargan proyectos, mostrar mensaje de carga
    if (!Proyectos || Proyectos.length === 0) {
        return (
            <>
                <Navbar />
                <div className="p-5 max-w-6xl mx-auto">
                    <h2 className="text-xl font-bold">Cargando proyectos...</h2>
                </div>
            </>
        );
    }

    // Buscar el proyecto actual por su ID
    const proyecto = Proyectos.find(p => p._id === id);

    // Si no se encuentra, mostrar mensaje de error
    if (!proyecto) {
        return (
            <>
                <Navbar />
                <div className="p-5 max-w-6xl mx-auto">
                    <h2 className="text-xl font-bold">Proyecto no encontrado.</h2>
                </div>
            </>
        );
    }

    // Formatear la URL de la imagen para evitar errores con backslashes
    const rutaLimpia = proyecto.urlimg?.replace(/\\/g, "/");
    const imagenURL = `http://localhost:3000/uploads/${rutaLimpia?.split("uploads/")[1]}`;

    // Formatear la URL del archivo APK
    const rutaAPK = proyecto.urlArchivoapk?.replace(/\\/g, "/");
    const archivoURL = `http://localhost:3000/uploads/${rutaAPK.replace(/\\/g, "/").split("uploads/")[1]}`;

    // Mostrar consola para verificar URL del archivo
    console.log("URL del archivo para descarga:", archivoURL);

    return (
        <>
            <Navbar />
            <div className="p-5 max-w-6xl mx-auto">
                <div className="flex flex-col gap-8">
                    {/* Información principal del proyecto */}
                    <div className="bg-gray-50 p-5 rounded-lg shadow-md flex justify-between items-center">
                        <div className="w-36 h-36">
                            <img src={imagenURL} alt={`Foto de ${proyecto.nombre_proyecto}`} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex flex-col ml-4">
                            <h2 className="text-xl font-bold">{proyecto.nombre_proyecto}</h2>
                            <p className="text-sm text-gray-600">{proyecto.autores.join(', ')}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    // Crear enlace de descarga dinámicamente
                                    const link = document.createElement("a");
                                    link.href = archivoURL;
                                    link.download = proyecto.nombre_proyecto + ".apk";
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
                        {proyecto.video && (
                            <div className="flex-shrink-0 w-96 h-56 flex justify-center items-center">
                                <video controls className="w-full h-full object-cover rounded-lg">
                                    <source src={proyecto.video} type="video/mp4" />
                                    Tu navegador no soporta el elemento de video.
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

                    {/* Sección de descripción y documentación */}
                    <div className="flex justify-between gap-10">
                        <div className="w-2/3">
                            <h3 className="text-lg font-semibold mb-2">Sobre esta aplicación:</h3>
                            <p className="text-base">{proyecto.descripcion}</p>
                            <p className="mt-2"><strong>Autores:</strong> {proyecto.autores.join(', ')}</p>
                            <p className="mt-2"><strong>Fecha de creación:</strong> {proyecto.fechaPublicacion}</p>
                        </div>
                        <div className="w-1/3">
                            <h3 className="text-lg font-semibold mb-2">Documentación:</h3>
                            {/* Mostrar botón si existe la URL de documentación */}
                            {proyecto.urlDoc ? (() => {
                                const rutaDoc = proyecto.urlDoc.replace(/\\/g, "/");
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

export default DetalleProyecto;
