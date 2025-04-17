import { Children, createContext, useEffect, useState, useContext } from "react";
import { subirPodcastAPI } from "../api/AdmiPodcast";

export const PodcastContext = createContext();

export const usePodcast = () => {
    const context = useContext(PodcastContext);
    if (!context) {
        throw new Error("Debe estar dentro de un provider");
    }
    return context;
};

export const PodcastProvider = ({ children }) => {
    const [Podcast, SetPodcast] = useState(null);
    const [errors,setErrors ] = useState([])
    const [mensaje, setMensaje] = useState(null); // <-- mensaje de éxito
    const sigout = async (data) => {
        try {
            const response = await subirPodcastAPI(data);
            SetPodcast(response.data);
    
            if (response.status === 200) {
                setMensaje("Podcast registrado correctamente!"); // <-- Mensaje de éxito
                setErrors([]); // Limpiar errores anteriores
            }
    
        } catch (error) {
            setMensaje(null); // Ocultar mensaje anterior de éxito si hay error
            setErrors(error.response?.data?.errors || [{ msg: "Error desconocido" }]);

        }
    };

    return (
        <PodcastContext.Provider value={{ sigout, Podcast,errors,mensaje, setMensaje }}>
            {children}
        </PodcastContext.Provider>
    );
};