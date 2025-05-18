import axios from "axios";

const Api = 'http://localhost:3000'

export const subirDocenteAPI = Usuario => axios.post(`${Api}/Usuarios`, Usuario)

export const GetAllDocentes = () => axios.get(`${Api}/Usuarios/C`)
export const GetIdDocentes = (id) => axios.get(`${Api}/Usuarios/${id}`)
export const PutDocentes = () => axios.put(`${Api}/Usuarios`)
export const DeleteDocentes = (id) => axios.delete(`${Api}/Usuarios/${id}`)

