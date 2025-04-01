//Añadir categoria 
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom';
import MenuDocente from "../components/MenuAdmi_Doc"

function NuevaCategoria() {
    // Definir estados del componente
    const [categoria, setCategoria] = useState({ nombre: '', descripcion: '', estado: 'activa' }); // Estado para almacenar los datos de la categoría
    const [errores, setErrores] = useState({}); // Estado para gestionar los errores en la validación
    const [enviando, setEnviando] = useState(false); // Estado que controla el botón de envío
    const [exito, setExito] = useState(false); // Estado que indica si el envío ha sido exitoso

    // Manejar cambios en los campos del formulario
    const manejarCambio = ({ target: { name, value } }) => {
        setCategoria(prev => ({ ...prev, [name]: value })); // Actualizar estado con los datos ingresados por el usuario
        if (errores[name]) setErrores(prev => ({ ...prev, [name]: null })); // Limpiar errores si el usuario corrige el campo
    };

    // Validar los datos del formulario antes de enviarlos
    const validarFormulario = () => {
        const nuevosErrores = {
            ...(categoria.nombre.trim() ? {} : { nombre: 'El nombre es requerido' }), // Validación: el nombre no puede estar vacío
            ...(categoria.descripcion.length > 200 ? { descripcion: 'Máximo 200 caracteres' } : {}) // Validación: la descripción no puede superar 200 caracteres
        };
        setErrores(nuevosErrores);
        return !Object.keys(nuevosErrores).length; // Retorna `true` si no hay errores
    };

    // Manejar el envío del formulario
    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return; // Si hay errores, detener el proceso

        setEnviando(true); // Indicar que el formulario está en proceso de envío
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación de solicitud a la API
        console.log('Categoría creada:', categoria); // Simulación de registro exitoso en la consola

        setExito(true); // Mostrar mensaje de éxito
        setCategoria({ nombre: '', descripcion: '', estado: 'activa' }); // Reiniciar el formulario
        setTimeout(() => setExito(false), 3000); // Ocultar el mensaje de éxito después de 3 segundos
        setEnviando(false); // Desactivar el estado de envío
    };

    return (
        <div>
            {/* Barra de navegación */}
            <Navbar />

            {/* Contenedor principal de la pantalla */}
            <div className="flex h-screen bg-gray-100">
                {/* Menú lateral para administración */}
                <MenuDocente rol="admin" />

                {/* Contenedor del formulario */}
                <div className="flex-1 overflow-y-auto ml-64 p-6 flex flex-col items-center pt-10">
                    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
                        {/* Título del formulario */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Añadir Nueva Categoría</h2>

                        {/* Mensaje de éxito en caso de envío exitoso */}
                        {exito && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">¡Categoría creada exitosamente!</div>}

                        {/* Formulario para ingresar los datos de la nueva categoría */}
                        <form onSubmit={manejarEnvio} className="space-y-4">
                            {/* Campos de entrada dinámicos: Nombre y Descripción */}
                            {["nombre", "descripcion"].map((campo) => (
                                <div key={campo}>
                                    {/* Etiqueta para el campo */}
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        {campo === "nombre" ? "Nombre de la categoría *" : "Descripción"}
                                    </label>

                                    {/* Entrada de datos: Input o Textarea dependiendo del campo */}
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

                                    {/* Mensaje de error si el usuario comete un error */}
                                    {errores[campo] && <p className="mt-1 text-sm text-red-600">{errores[campo]}</p>}

                                    {/* Contador de caracteres para el campo descripción */}
                                    {campo === "descripcion" && <p className="text-xs text-gray-500">{categoria.descripcion.length}/200</p>}
                                </div>
                            ))}

                            {/* Selector para el estado de la categoría */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Estado</label>
                                <select name="estado" value={categoria.estado} onChange={manejarCambio} className="w-full px-3 py-2 border border-gray-300 rounded-md">
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