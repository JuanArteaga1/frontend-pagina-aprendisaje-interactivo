import axios from "axios";
const Api = import.meta.env.VITE_RUTA1;// tu IP local aquí


export const subirProyectosAPI = Proyectos => axios.post(`${Api}/Proyectos`, Proyectos)

export const GetAllProyectos = () => axios.get(`${Api}/Proyectos`)
export const GetIdProyectos = (id) => axios.get(`${Api}/Proyectos/${id}`)
export const PutProyectos = (id,Proyectos) => axios.put(`${Api}/Proyectos/${id}`,Proyectos)
export const DeleteProyectos = (id) => axios.delete(`${Api}/Proyectos/${id}`)