import axios from "axios";

const Api = import.meta.env.VITE_RUTA1; // tu IP local aquí


export const subirInvestigacionAPI = Investigacion => axios.post(`${Api}/Investigacion`, Investigacion)

export const GetAllInvestigacion = () => axios.get(`${Api}/Investigacion`)
export const GetIdInvestigacion = (id) => axios.get(`${Api}/Investigacion/${id}`)
export const PutInvestigacion = (id,Investigacion) => axios.put(`${Api}/Investigacion/${id}`,Investigacion)
export const DeleteInvestigacion = (id) => axios.delete(`${Api}/Investigacion/${id}`)