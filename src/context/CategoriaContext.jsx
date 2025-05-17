import { Children, createContext, useEffect, useState, useContext } from "react";
import { subirCategoriaAPI,GetAllCategoria } from "../api/AdmiCategoria";
import { Settings } from "lucide-react";

export const CategoriaContext = createContext();

export const UseCategoria = () => {
    const context = useContext(CategoriaContext);
    if (!context) {
        throw new Error("Debe estar dentro de un provider");
    }
    return context;
};

export const CategoriaProvider = ({ children }) => {
    const [Categoria, SetCategoria] = useState(null);
    const [errors,setErrors ] = useState([])
    const [mensaje, setMensaje] = useState(null); 
    
    const TraerCategoria = async() =>{
        
        try {
            const Categoria = await GetAllCategoria()
            SetCategoria(Categoria.data)
        } catch (error) {
            console.log(error)
            
        }

    }
    const sigout = async (data) => {
        try {
            const response = await subirCategoriaAPI(data);
            SetCategoria(response.data);
    
            if (response.status >= 200 && response.status <= 399)  {
                setMensaje("¡Categoria registrada correctamente!"); // <-- Mensaje de éxito
                setErrors([]); // Limpiar errores anteriores
            }
        } catch (error) {
            setMensaje(null); // Ocultar mensaje anterior de éxito si hay error
            setErrors(error.response?.data?.errors || [{ msg: "Error desconocido" }]);

        }
    };

    return (
        <CategoriaContext.Provider value={{ sigout,Categoria,TraerCategoria,errors, mensaje, setMensaje,}}>
            {children}
        </CategoriaContext.Provider>
    );
};