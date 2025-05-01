import { createContext, useState, useContext } from "react";


import { LoginUsuario } from "../api/LoginApi";

// Crear el contexto
export const LoginContext = createContext();

export const useLogin = () => {
    const context = useContext(LoginContext);

    if (!context) {
        throw new Error("useLogin debe usarse dentro de un LoginProvider");
    }
    return context;
};

// Crear el proveedor del contexto
export const LoginProvider = ({ children }) => {
    const [Usuario, setUsuario] = useState(null);
    const [isAutheticated, setIsAutheticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [mensaje, setMensaje] = useState(null);
    const signin = async (values) => {
        try {
            const response = await LoginUsuario(values)
            console.log("aqui")
            setUsuario(response.data);
            setIsAutheticated(true)
        } catch (error) {
            setMensaje(null); // Ocultar mensaje anterior de éxito si hay error
            const errores = error.response?.data?.errors || [{ message: "Error desconocido" }];
            setErrors(errores);
        }
    };

    return (
        <LoginContext.Provider value={{ signin, Usuario, isAutheticated, errors }}>
            {children}
        </LoginContext.Provider>
    );
};