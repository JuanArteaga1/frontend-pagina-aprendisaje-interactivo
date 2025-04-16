//Añadir categoria 
import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import MenuDocente from "../components/MenuAdmi_Doc";

function NuevaCategoria() {
    // Definir estados del componente
    const [categoria, setCategoria] = useState({ nombre: '', descripcion: '', estado: 'activa' });
    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);
    const [exito, setExito] = useState(false);

    // Manejar cambios en los campos del formulario
    const manejarCambio = ({ target: { name, value } }) => {
        setCategoria(prev => ({ ...prev, [name]: value }));
        if (errores[name]) setErrores(prev => ({ ...prev, [name]: null }));
    };

    // Validar los datos del formulario antes de enviarlos
    const validarFormulario = () => {
        const nuevosErrores = {
            ...(categoria.nombre.trim() ? {} : { nombre: 'El nombre es requerido' }),
            ...(categoria.descripcion.length > 200 ? { descripcion: 'Máximo 200 caracteres' } : {})
        };
        setErrores(nuevosErrores);
        return !Object.keys(nuevosErrores).length;
    };

    // Manejar el envío del formulario
    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        setEnviando(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Categoría creada:', categoria);

        setExito(true);
        setCategoria({ nombre: '', descripcion: '', estado: 'activa' });
        setTimeout(() => setExito(false), 3000);
        setEnviando(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Menú Lateral */}
            <div className="w-64 bg-gray-800 text-white">
                <MenuDocente rol="admin" />
            </div>
            
            {/* Contenido Principal */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col items-center pt-10">
                    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
                        {/* Título del formulario */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Añadir Nueva Categoría</h2>

                        {/* Mensaje de éxito */}
                        {exito && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">¡Categoría creada exitosamente!</div>}

                        {/* Formulario */}
                        <form onSubmit={manejarEnvio} className="space-y-4">
                            {/* Campos de entrada dinámicos */}
                            {["nombre", "descripcion"].map((campo) => (
                                <div key={campo}>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        {campo === "nombre" ? "Nombre de la categoría *" : "Descripción"}
                                    </label>

                                    {campo === "descripcion" ? (
                                        <textarea
                                            name={campo}
                                            value={categoria[campo]}
                                            onChange={manejarCambio}
                                            rows="3"
                                            className={`w-full px-3 py-2 border rounded-md ${errores[campo] ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Breve descripción de la categoría"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name={campo}
                                            value={categoria[campo]}
                                            onChange={manejarCambio}
                                            className={`w-full px-3 py-2 border rounded-md ${errores[campo] ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Ej: Aplicaciones Móviles"
                                        />
                                    )}

                                    {errores[campo] && <p className="mt-1 text-sm text-red-600">{errores[campo]}</p>}
                                    {campo === "descripcion" && <p className="text-xs text-gray-500">{categoria.descripcion.length}/200</p>}
                                </div>
                            ))}

                            {/* Selector de estado */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Estado</label>
                                <select 
                                    name="estado" 
                                    value={categoria.estado} 
                                    onChange={manejarCambio} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="activa">Activa</option>
                                    <option value="inactiva">Inactiva</option>
                                </select>
                            </div>

                            {/* Botón de Guardar */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    disabled={enviando}
                                    className={`px-6 py-2 rounded-md text-white font-medium w-full max-w-xs ${
                                        enviando ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    {enviando ? 'Guardando...' : 'Guardar Categoría'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevaCategoria;