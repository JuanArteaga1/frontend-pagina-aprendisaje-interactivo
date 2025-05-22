import React, { useEffect, useState } from "react";
import TablaDinamica from "../components/Tabla";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UseDocente } from "../context/DocenteContext";
import Swal from 'sweetalert2';

const AdministrarDocente = () => {
  const { Docente, TraerDocentes, EliminarDocentes } = UseDocente();
  const [columnas, setColumnas] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Estaba faltando esta línea si vas a usar location.state
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    TraerDocentes();
  }, []);

  useEffect(() => {
    setColumnas([
      { key: 'nombre', nombre: 'Nombre' },
      { key: 'identificacion', nombre: 'Identificación' },
      { key: 'email', nombre: 'Correo' },
      { key: 'Codigo', nombre: 'Código' },
      { key: 'estado', nombre: 'Estado' }
    ]);
  }, []);

  const acciones = [
    {
      nombre: "Editar",
      fn: (fila) => {
        navigate(`/editar-docente/${fila._id}`, { state: { docente: fila } });
      },
      estilo: "bg-yellow-500 text-white hover:bg-yellow-600"
    },
    {
      nombre: "Eliminar",
      fn: (fila) => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: `Esta acción eliminará al docente "${fila.NombreCompleto}"`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await EliminarDocentes(fila._id);
              Swal.fire('¡Eliminado!', 'El docente ha sido eliminado.', 'success');
              TraerDocentes(); // <- para refrescar la lista después de eliminar
            } catch (error) {
              console.error(error);
              Swal.fire('Error', 'Hubo un problema al eliminar el docente.', 'error');
            }
          }
        });
      },
      estilo: "bg-red-500 text-white hover:bg-red-600"
    }
  ];

  useEffect(() => {
    if (location.state?.mensaje) {
      setMensaje(location.state.mensaje);
      setTipoMensaje(location.state.tipo || "success");

      setTimeout(() => {
        setMensaje(null);
        navigate(location.pathname, { replace: true });
      }, 3000);
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú Lateral */}
      <div className="fixed h-full w-64 bg-gray-800 text-white z-10">
        <MenuAdministrador rol="admin" />
      </div>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 ml-64">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Administrar Docentes
          </h1>
          <div className="flex space-x-4">
            <Link
              to="/SubirDocente"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              + Nuevo Docente
            </Link>
          </div>
        </div>

        {mensaje && (
          <div className={`mb-4 p-2 rounded ${tipoMensaje === "success"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"}`}>
            {mensaje}
          </div>
        )}

        <TablaDinamica
          datos={Docente}
          columnas={columnas}
          acciones={acciones}
        />
      </main>
    </div>
  );
};

export default AdministrarDocente;
