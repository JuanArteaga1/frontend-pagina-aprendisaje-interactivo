import axios from "axios";

const Api = 'http://localhost:3000';

export const LoginUsuario = (Loginentrada, token) =>
    axios.post(`${Api}/login`, Loginentrada, {

    });

export const outUsuario = () => axios.post(`${Api}/login/out`, {});