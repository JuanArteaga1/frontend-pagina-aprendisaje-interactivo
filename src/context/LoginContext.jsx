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
    const [isAutheticated,setIsAutheticated] = useState(false)
    const [errors ,setErrors] = useState([])
    const signin = async (values) => {
        try {
            const res = await LoginUsuario(values);
            setUsuario(res.data);
            setIsAutheticated(true)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    };

    return (
        <LoginContext.Provider value={{ signin, Usuario,isAutheticated,errors}}>
            {children}
        </LoginContext.Provider>
    );
};