//Añadir categoria 
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom';
import MenuDocente from "../components/MenuAdmi_Doc"

function NuevaCategoria() {
    // Estados del componente
    const [categoria, setCategoria] = useState({
        nombre: '',
        descripcion: '',
        estado: 'activa'
    });
    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);
    const [exito, setExito] = useState(false);

    // Maneja cambios en los campos del formulario
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setCategoria(prev => ({ ...prev, [name]: value }));
        if (errores[name]) setErrores(prev => ({ ...prev, [name]: null }));
    };

    // Valida los datos del formulario
    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!categoria.nombre.trim()) nuevosErrores.nombre = 'El nombre es requerido';
        if (categoria.descripcion.length > 200) nuevosErrores.descripcion = 'Máximo 200 caracteres';
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Maneja el envío del formulario
    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        
        setEnviando(true);
        try {
            // Simulación de llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Categoría creada:', categoria);
            setExito(true);
            setCategoria({ nombre: '', descripcion: '', estado: 'activa' });
            setTimeout(() => setExito(false), 3000);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="flex h-screen bg-gray-100">
                <MenuDocente rol="admin"/>
                
                {/* Contenido principal */}
                <div className="flex-1 overflow-y-auto ml-64 p-6">
                    <div className="flex flex-col items-center pt-10">
                        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                Añadir Nueva Categoría
                            </h2>
                            
                            {/* Mensaje de éxito */}
                            {exito && (
                                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
                                    ¡Categoría creada exitosamente!
                                </div>
                            )}
                            
                            <form onSubmit={manejarEnvio} className="space-y-4">
                                {/* Campo Nombre */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Nombre de la categoría *
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={categoria.nombre}
                                        onChange={manejarCambio}
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errores.nombre ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Ej: Aplicaciones Móviles"
                                    />
                                    {errores.nombre && <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>}
                                </div>
                                
                                {/* Campo Descripción */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Descripción
                                    </label>
                                    <textarea
                                        name="descripcion"
                                        value={categoria.descripcion}
                                        onChange={manejarCambio}
                                        rows="3"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errores.descripcion ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Breve descripción de la categoría"
                                    />
                                    <div className="flex justify-between mt-1">
                                        {errores.descripcion && <p className="text-sm text-red-600">{errores.descripcion}</p>}
                                        <p className="text-xs text-gray-500">{categoria.descripcion.length}/200</p>
                                    </div>
                                </div>
                                
                                {/* Selector de Estado */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Estado
                                    </label>
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
        </div>
    );
}

export default NuevaCategoria;