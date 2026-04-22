import React, { useEffect, useState } from "react";
import TablaDinamica from "../components/Tabla";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UseDocente } from "../context/DocenteContext";
import Swal from 'sweetalert2';

const AdministrarDocente = () => {
  const { EliminarSolicitud, Docente, TraerDocentes, EliminarDocentes, Solicitudes, TraerSolicitudes } = UseDocente();
  const [columnas, setColumnas] = useState([]);
  const [columnasSolicitudes, setColumnasSolicitudes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [mensaje, setMensaje] = useState(null);
  const [railColapsado, setRailColapsado] = useState(false);

  useEffect(() => {
    TraerDocentes();
    TraerSolicitudes && TraerSolicitudes(); // si existe en el contexto
  }, []);

  useEffect(() => {
    setColumnas([
      { key: 'nombre', nombre: 'Nombre' },
      { key: 'identificacion', nombre: 'Identificación' },
      { key: 'email', nombre: 'Correo' },
    ]);

    setColumnasSolicitudes([
      { key: "email", nombre: "Correo" },
      { key: "createdAt", nombre: "Fecha de Creación" },
      { key: "activation_expires", nombre: "Expiración / Estado" },
    ]);
  }, []);

  const acciones = [
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
              TraerDocentes();
            } catch (error) {
              console.error(error);
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
    <div className="flex min-h-[100dvh] bg-[var(--color-background)]">
      <aside className="fixed inset-y-0 left-0 z-20 h-[100dvh] max-h-[100dvh]">
        <MenuAdministrador
          rol="admin"
          colapsado={railColapsado}
          setColapsado={setRailColapsado}
        />
      </aside>

      <main
        className={`flex-1 overflow-y-auto p-4 lg:p-8 ${railColapsado ? "pl-16" : "pl-[17.5rem]"}`}
      >
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Administrar Usuarios
          </h1>
          <div className="flex space-x-4">
            <Link
              to="/SubirDocente"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              + Nuevo Usuario
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

        {/* Tabla de Docentes */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Lista de Docentes</h2>
        <TablaDinamica
          datos={Docente}
          columnas={columnas}
          acciones={acciones}
        />

        {/* Tabla de Solicitudes */}
        <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-2">Solicitudes Enviadas</h2>
        <TablaDinamica
          datos={Solicitudes}
          columnas={columnasSolicitudes}
          acciones={[
            {
              nombre: "Eliminar",
              fn: (fila) => {
                Swal.fire({
                  title: '¿Estás seguro?',
                  text: `Esta acción eliminará la solicitud de "${fila.email}"`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Sí, eliminar',
                  cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      await EliminarSolicitud(fila.id);
                      TraerSolicitudes();
                    } catch (error) {
                      console.error(error);
                    }
                  }
                });
              },
              estilo: "bg-red-500 text-white hover:bg-red-600"
            }
          ]}
        />
      </main>
    </div>
  );
};

export default AdministrarDocente;
