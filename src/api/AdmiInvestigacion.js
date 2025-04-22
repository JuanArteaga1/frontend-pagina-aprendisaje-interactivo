import axios from "axios";

const Api = 'http://localhost:3000'

export const subirInvestigacionAPI = Investigacion => axios.post(`${Api}/Investigacion`, Investigacion)

export const GetAllProyectos = () => axios.get(`${Api}/Investigacion`)
export const GetIdProyectos = (id) => axios.get(`${Api}/Investigacion/${id}`)
export const PutProyectos = () => axios.put(`${Api}/Investigacion`)
export const DeleteProyectos = () => axios.delete(`${Api}/Investigacion`)