import { Children, createContext, useEffect, useState, useContext } from "react";
import { subirSimulacionesAPI, GetAllSimulaciones, PutSimulaciones, DeleteSimulaciones } from "../api/AdmiSimulaciones";
import { GetAllPodcast } from "../api/AdmiPodcast";

export const SimulacionesContext = createContext();

export const UseSimulaciones = () => {
    const context = useContext(SimulacionesContext);
    if (!context) {
        throw new Error("Debe estar dentro de un provider");
    }
    return context;
};

export const SimulacionesProvider = ({ children }) => {
    const [Simulaciones, SetSimulaciones] = useState(null);
    const [errors, setErrors] = useState([])
    const [mensaje, setMensaje] = useState(null);
    const ActualizarSimulaciones = async (Id, data) => {
        try {
            const response = await PutSimulaciones(Id, data);
            SetSimulaciones(response);

            return { success: true, data: response };
        } catch (error) {
            setMensaje(null);
            setErrors(error.response?.data?.errors || [{ msg: "Error desconocido" }]);

            return { success: false, error: error.response?.data?.errors };
        }
    };


    const sigout = async (data) => {
        try {
            const response = await subirSimulacionesAPI(data);
            SetSimulaciones(response.data);

            if (response.status >= 200 && response.status <= 399) {
                setMensaje("¡Proyecto registrado correctamente!"); // <-- Mensaje de éxito
                setErrors([]); // Limpiar errores anteriores
            }

        } catch (error) {
            setMensaje(null); // Ocultar mensaje anterior de éxito si hay error
            setErrors(error.response?.data?.errors || [{ msg: "Error desconocido" }]);

        }
    };

    return (
        <SimulacionesContext.Provider value={{ sigout, Simulaciones, errors, mensaje, setMensaje,ActualizarSimulaciones }}>
            {children}
        </SimulacionesContext.Provider>
    );
};