import { Children, createContext, useEffect, useState, useContext } from "react";
import { subirDocenteAPI,GetAllDocentes, GetIdDocentes, DeleteDocentes } from "../api/AdmimnistrarDocente";

export const DocenteContext = createContext();

export const UseDocente = () => {
    const context = useContext(DocenteContext);
    if (!context) {
        throw new Error("Debe estar dentro de un provider");
    }
    return context;
};

export const DocenteProvider = ({ children }) => {
    const [Docente, SetDocente] = useState(null);
    const [errors,setErrors ] = useState([])
    const [mensaje, setMensaje] = useState(null); 
    
    const TraerDocentes = async() =>{
        try {
            const Docentes = await GetAllDocentes()
            SetDocente(Docentes)
        } catch (error) {
            console.log(error)
            
        }
    }

    const EliminarDocentes = async (id) => {
              try {
                await DeleteDocentes(id);
                await TraerDocentes();
                return { success: true };
              } catch (error) {
                console.log("Error al eliminar el docente:", error);
                return { success: false, error };
              }
            };

    const sigout = async (data) => {
        try {
            const response = await subirDocenteAPI(data);
            SetDocente(response.data);
    
            if (response.status === 200) {
                setMensaje("¡Docente registrado correctamente!"); // <-- Mensaje de éxito
                setErrors([]); // Limpiar errores anteriores
            }
    
        } catch (error) {
            setMensaje(null); // Ocultar mensaje anterior de éxito si hay error
            setErrors(error.response?.data?.errors || [{ msg: "Error desconocido" }]);

        }
    };

    return (
        <DocenteContext.Provider value={{ sigout, Docente,errors,mensaje, setMensaje,SetDocente,TraerDocentes, EliminarDocentes }}>
            {children}
        </DocenteContext.Provider>
    );
};
