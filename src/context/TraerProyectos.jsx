import { Children, createContext, useEffect, useState, useContext } from "react";
import { GetAllProyectos } from "../api/AdminTraerProyectos";

export const TraerProyectosContext = createContext();


export const UseTraerProyectos = () => {
    const context = useContext(TraerProyectosContext);
    if (!context) {
        throw new Error("Debe estar dentro de un provider");
    }
    return context;
};

export const TraerProyectosProvider = ({ children }) => {
    const [TraerProyectos, SetTraerProyectos] = useState(null);
    const [errors, setErrors] = useState([])
    const [mensaje, setMensaje] = useState(null);
    const TraerProyectosT = async() =>{
            try {
                const TraerProyectos = await GetAllProyectos()
                console.log(TraerProyectos)
                SetTraerProyectos(TraerProyectos)
            } catch (error) {
                console.log(error)
            }
        }
    return (
        <TraerProyectosContext.Provider value={{ TraerProyectos, errors, mensaje, setMensaje, SetTraerProyectos, TraerProyectosT }}>
            {children}
        </TraerProyectosContext.Provider>
    );
};