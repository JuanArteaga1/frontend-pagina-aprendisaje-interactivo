import { Children, createContext, useEffect, useState, useContext } from "react";
import { subirProyectosAPI } from "../api/AdmiProyecto";

export const ProyectoContext = createContext();

export const UseProyectos = () => {
    const context = useContext(ProyectoContext);
    if (!context) {
        throw new Error("Debe estar dentro de un provider");
    }
    return context;
};

export const ProyectosProvider = ({ children }) => {
    const [Proyectos, SetProyectos] = useState(null);
    const [errors,setErrors ] = useState([])
    const [mensaje, setMensaje] = useState(null); // <-- mensaje de éxito
    const sigout = async (data) => {
        try {
            const response = await subirProyectosAPI(data);
            SetProyectos(response.data);
    
            if (response.status === 200) {
                setMensaje("¡Proyecto registrado correctamente!"); // <-- Mensaje de éxito
                setErrors([]); // Limpiar errores anteriores
            }
    
        } catch (error) {
            setMensaje(null); // Ocultar mensaje anterior de éxito si hay error
            setErrors(error.response?.data?.errors || [{ msg: "Error desconocido" }]);

        }
    };

    return (
        <ProyectoContext.Provider value={{ sigout, Proyectos,errors,mensaje, setMensaje }}>
            {children}
        </ProyectoContext.Provider>
    );
};