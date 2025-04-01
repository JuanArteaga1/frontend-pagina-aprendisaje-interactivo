import React from "react";
import Navbar from "../components/Navbar";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import TablaAdmin from "../components/TablaAdministracion";

const AdministrarDocente = () => {
    const userRole = "admin";

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Navbar Superior */}
            <div className="">
                <Navbar />
            </div>

            {/* Contenido Principal */}
            <div className="flex flex-1 overflow-hidden">
                {/* Menú Lateral */}
                <aside className="w-56 bg-blue-800 text-white flex-shrink-0 overflow-y-auto">
                    <MenuAdministrador rol={userRole} />
                </aside>

                {/* Área de Contenido */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {/* Tabla de Proyectos */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <TablaAdmin />
                    </div>

                    {/* Pie de página */}
                    <footer className="mt-8 text-right">
                        <p className="text-gray-600">Señor Administrador</p>
                        <button className="text-blue-600 hover:underline mt-2">
                        </button>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default AdministrarDocente;