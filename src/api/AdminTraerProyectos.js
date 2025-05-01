import axios from "axios";

const Api = 'http://localhost:3000'

export const GetAllProyectos = () => axios.get(`${Api}/TraerProyectos`)
export const GetIdProyectos = (id) => axios.get(`${Api}/TraerProyectos/${id}`)
export const DeleteProyectos = () => axios.delete(`${Api}/TraerProyectos`)
export const PutProyectos = () => axios.put(`${Api}/TraerProyectos`)