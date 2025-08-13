import axios from "axios";

const Api = import.meta.env.VITE_RUTA1; // tu IP local aquí


export const LoginUsuario = (Loginentrada, token) =>
    axios.post(`${Api}/login`, Loginentrada, {

    });

export const outUsuario = () => axios.post(`${Api}/login/out`, {});
