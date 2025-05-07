import { createContext, useState, useContext,useEffect } from "react";
import axios from "axios";
import { LoginUsuario,outUsuario } from "../api/LoginApi";

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
    const [isAutheticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [mensaje, setMensaje] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Opcional: validar el token con el backend
            const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
            if (usuarioGuardado) {
                setUsuario(usuarioGuardado);
                setIsAuthenticated(true);
                
                // Puedes setear el token por defecto en axios
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
        }
    }, []);
    const signin = async (values) => {
        try {
            const response = await LoginUsuario(values)
            setUsuario(response.data);
            setIsAuthenticated(true)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("usuario", JSON.stringify(response.data));
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        } catch (error) {
            setMensaje(null); // Ocultar mensaje anterior de éxito si hay error
            const errores = error.response?.data?.errors || [{ message: "Error desconocido" }];
            setErrors(errores);
        }
    };

    const signout = async() => {
        await outUsuario()
        setUsuario(null)
        setIsAuthenticated(false)
        localStorage.removeItem("token")
        localStorage.removeItem("usuario")
        delete axios.defaults.headers.common["Authorization"]
    };

    return (
        <LoginContext.Provider value={{ signout,signin, Usuario,setUsuario, isAutheticated, errors }}>
            {children}
        </LoginContext.Provider>
    );
};