import axios from "axios";

const Api = 'http://localhost:3000'

export const GetAllProyectos = () => axios.get(`${Api}/TraerProyectos`)
export const GetIdProyectos = (id) => axios.get(`${Api}/TraerProyectos/${id}`)
export const DeleteProyectos = (id,proyectos) => axios.delete(`${Api}/TraerProyectos/${id}`,{data: { tipo: proyectos }})
export const PutProyectos = () => axios.put(`${Api}/TraerProyectos`)