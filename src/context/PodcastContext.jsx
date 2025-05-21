import { Children, createContext, useEffect, useState, useContext } from "react";
import { GetAllPodcast, subirPodcastAPI, PutPodcast, DeletePodcast, GetIdPodcast } from "../api/AdmiPodcast";

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
    const [errors, setErrors] = useState([])
    const [mensaje, setMensaje] = useState(null);
    const [traerProyectoId, SettraerProyectoId] = useState(null);

    const TraerPodcast = async () => {
        try {
            const podcast = await GetAllPodcast()
            console.log(podcast)
            SetPodcast(podcast)
        } catch (error) {
            console.log(error)

        }
    } // <-- mensaje de éxito

    const ActualizarPodcast = async (Id, data) => {
        try {
            const response = await PutPodcast(Id, data);
            SetPodcast(response);

            return { success: true, data: response };
        } catch (error) {
            setMensaje(null);
            setErrors(error.response?.data?.errors || [{ msg: "Error desconocido" }]);

            return { success: false, error: error.response?.data?.errors };
        }
    };

    const EliminarPodcast = async (id) => {
        try {
            await DeletePodcast(id);
            await TraerPodcast();
            return { success: true };
        } catch (error) {
            console.log("Error al eliminar el podcast:", error);
            return { success: false, error };
        }
    };

    const TraerPodcastId = async (Id) => {
        try {
            const response = await GetIdPodcast(Id); // Llamada a la API por ID
            console.log(response.data); // Mostrar en consola para depuración
            SettraerProyectoId(response.data); // Guardar el resultado en el estado
        } catch (error) {
            console.log(error); // Mostrar errores en consola
        }
    };
    

    const sigout = async (data) => {
        try {
            const response = await subirPodcastAPI(data);
            SetPodcast(response.data);
            if (response.status >= 200 && response.status <= 399) {
                setMensaje("¡Podcast registrado correctamente!");
                setErrors([]); // Limpiar errores anteriores
            }

        } catch (error) {
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
        <PodcastContext.Provider value={{ sigout, Podcast, errors, mensaje, setMensaje, SetPodcast, TraerPodcast, ActualizarPodcast, EliminarPodcast, TraerPodcastId}}>
            {children}
        </PodcastContext.Provider>
    );
};