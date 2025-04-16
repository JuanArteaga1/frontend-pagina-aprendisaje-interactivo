import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TablaDinamica from "../components/Tabla";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import { Link } from 'react-router-dom';
import { UseDocente } from "../context/DocenteContext";

const AdministrarDocente = () => {
  const { Docente, TraerDocentes } = UseDocente();
  const [columnas, setColumnas] = useState([]);
  useEffect(() => {
    TraerDocentes()
  }, [])
 // <- Asegúrate de que `docentes` ya tiene los datos

  useEffect(() => {
    setColumnas([
      { key: 'nombre', nombre: 'Nombre' },
      { key: 'identificacion', nombre: 'Identificación' },
      { key: 'email', nombre: 'Correo' },
      { key: 'Codigo', nombre: 'Código' },
      { key: 'estado', nombre: 'Estado' }
    ]);
  }, []);

  // Opcional: Acciones
  const acciones = [
    {
      nombre: "Editar",
      fn: (fila) => {
        console.log("Editar:", fila);
        // Puedes redirigir o abrir modal aquí
      },
      estilo: "bg-yellow-500 text-white hover:bg-yellow-600"
    },
    {
      nombre: "Eliminar",
      fn: (fila) => {
        console.log("Eliminar:", fila);
      },
      estilo: "bg-red-500 text-white hover:bg-red-600"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-1 pt-16">
        <MenuAdministrador rol="admin" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 ml-64">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Administrar Docentes</h1>
            <div className="flex space-x-4">
              <Link
                to="/SubirDocente"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                + Nuevo Docente
              </Link>
            </div>
          </div>

          <TablaDinamica
            datos={Docente}
            columnas={columnas}
            acciones={acciones}
          />
        </main>
      </div>
    </div>
  );
};

export default AdministrarDocente;
