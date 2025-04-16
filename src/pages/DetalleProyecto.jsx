import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const DetalleProyecto = () => {
    const { proyecto } = useParams();

    return (
        <>
            <Navbar />
            <div className="p-5 max-w-6xl mx-auto">
                <div className="flex flex-col gap-8">
                    {/* Sección superior */}
                    <div className="bg-gray-50 p-5 rounded-lg shadow-md flex justify-between items-center">
                        <div className="w-36 h-36">
                            <img src="/img/fotoapp.png" alt={`Foto de ${proyecto}`} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex flex-col ml-4">
                            <h2 className="text-xl font-bold">{proyecto}</h2>
                            <p className="text-sm text-gray-600">[Autor]</p>
                        </div>
                        <div>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500">Descargar</button>
                        </div>
                    </div>

                    {/* Sección media: Video e imágenes con carrusel */}
                    <div className="flex overflow-x-auto gap-5 pb-4 scroll-snap-type-x mandatory">
                        <div className="flex-shrink-0 w-96 h-56 flex justify-center items-center">
                            <video controls className="w-full h-full object-cover rounded-lg">
                                <source src="video/video.mp4" type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                        <div className="flex-shrink-0 w-96 h-56">
                            <img src="/img/fotoapp.png" alt="Imagen 1" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex-shrink-0 w-96 h-56">
                            <img src="/img/fotoapp.png" alt="Imagen 2" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex-shrink-0 w-96 h-56">
                            <img src="/img/fotoapp.png" alt="Imagen 3" className="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>

                    {/* Sección inferior: Información y Documentación */}
                    <div className="flex justify-between gap-10">
                        <div className="w-2/3">
                            <h3 className="text-lg font-semibold mb-2">Sobre esta aplicación:</h3>
                            <p className="text-base">Descripción del proyecto o simulación {proyecto}.</p>
                            <p className="mt-2"><strong>Autores:</strong> Autor 1, Autor 2</p>
                            <p className="mt-2"><strong>Fecha de creación:</strong> 2023</p>
                        </div>
                        <div className="w-1/3">
                            <h3 className="text-lg font-semibold mb-2">Documentación:</h3>
                            <p className="text-base mb-2">Aquí se subirán los documentos relevantes, como manuales o guías de usuario.</p>
                            <a href="documento1.pdf" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline text-sm">Documento 1 (PDF)</a>
                            <a href="documento2.pdf" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline text-sm">Documento 2 (PDF)</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetalleProyecto;
