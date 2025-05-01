import { Children, createContext, useEffect, useState, useContext } from "react";
import { GetAllPodcast, subirPodcastAPI } from "../api/AdmiPodcast";

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
    const [mensaje, setMensaje] = useState(null);
    const TraerPodcast = async() =>{
                try {
                    const podcast = await GetAllPodcast()
                    console.log(podcast)
                    SetPodcast(podcast)
                } catch (error) {
                    console.log(error)
                    
                }
             } // <-- mensaje de éxito
    const sigout = async (data) => {
        try {
            const response = await subirPodcastAPI(data);
            console.log(response.status)
            SetPodcast(response.data);
            console.log("entro")
            if (response.status >= 200 && response.status <= 399) {
                console.log("entro")
                setMensaje("¡Podcast registrado correctamente!");
                setErrors([]); // Limpiar errores anteriores
            }
    
        } catch (error) {
            console.log("entro 2")
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.data && error.response.data.msg) {
                // Por si el error tiene un solo mensaje
                setErrors([{ msg: error.response.data.msg }]);
            } else {
                setErrors([{ msg: "Error desconocido. Intenta más tarde." }]);
            }

        }
    };

    return (
        <PodcastContext.Provider value={{ sigout, Podcast,errors,mensaje, setMensaje,SetPodcast,TraerPodcast}}>
            {children}
        </PodcastContext.Provider>
    );
};