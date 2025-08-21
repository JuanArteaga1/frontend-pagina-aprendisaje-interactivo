import axios from "axios";

const Api = 'http://localhost:3000'

export const RegistroDocenteAPI = Usuario => axios.post(`${Api}/Usuarios/registro`, Usuario)
export const ValidarTokenAPI = (token) => axios.get(`${Api}/Usuarios/validar-token/${token}`)
