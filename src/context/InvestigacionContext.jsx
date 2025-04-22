import { Children, createContext, useEffect, useState, useContext } from "react";
import { subirInvestigacionAPI } from "../api/AdmiInvestigacion";

export const InvestigacionContext = createContext();

export const UseInvestigacion = () => {
    const context = useContext(InvestigacionContext);
    if (!context) {
        throw new Error("Debe estar dentro de un provider");
    }
    return context;
};

export const InvestigacionProvider = ({ children }) => {
    const [Investigacion, SetInvestigacion] = useState(null);
    const [errors,setErrors ] = useState([])
    const [mensaje, setMensaje] = useState(null); // <-- mensaje de éxito
    const sigout = async (data) => {
        try {
            const response = await subirInvestigacionAPI(data);
            SetInvestigacion(response.data);
    
            if (response.status === 200) {
                setMensaje("¡Investigacion registrada correctamente!"); // <-- Mensaje de éxito
                setErrors([]); // Limpiar errores anteriores
            }
    
        } catch (error) {
            setMensaje(null); // Ocultar mensaje anterior de éxito si hay error
            setErrors(error.response?.data?.errors || [{ msg: "Error desconocido" }]);

        }
    };

    return (
        <InvestigacionContext.Provider value={{ sigout, Investigacion,errors,mensaje, setMensaje }}>
            {children}
        </InvestigacionContext.Provider>
    );
};