import axios from "axios";

const Api = 'http://localhost:3000'

export const subirDocenteAPI = Usuario => axios.post(`${Api}/Usuarios`, Usuario)
