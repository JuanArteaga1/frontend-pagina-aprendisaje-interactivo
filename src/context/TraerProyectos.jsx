import { Children, createContext, useEffect, useState, useContext } from "react";
import { GetAllProyectos,GetIdProyectos } from "../api/AdminTraerProyectos";

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
    const [traerProyectoId, SettraerProyectoId] = useState(null);
    const [errors, setErrors] = useState([])
    const [mensaje, setMensaje] = useState(null);
    const TraerProyectosT = async() =>{
            try {
                const TraerProyectos = await GetAllProyectos()
                SetTraerProyectos(TraerProyectos)
            } catch (error) {
                console.log(error)
            }
        }

        const TraerProyectosId = async(Id) =>{
            try {
                const traerProyectoId = await GetIdProyectos(Id)
                console.log(traerProyectoId)
                SettraerProyectoId(traerProyectoId)
            } catch (error) {
                console.log(error)
            }
        }
    return (
        <TraerProyectosContext.Provider value={{TraerProyectos, errors, mensaje, setMensaje, SetTraerProyectos, TraerProyectosT,TraerProyectosId,traerProyectoId }}>
            {children}
        </TraerProyectosContext.Provider>
    );
};