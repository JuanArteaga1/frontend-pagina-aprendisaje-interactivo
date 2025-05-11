import axios from "axios";

const Api = 'http://localhost:3000'

export const subirInvestigacionAPI = Investigacion => axios.post(`${Api}/Investigacion`, Investigacion)

export const GetAllInvestigacion = () => axios.get(`${Api}/Investigacion`)
export const GetIdInvestigacion = (id) => axios.get(`${Api}/Investigacion/${id}`)
export const PutInvestigacion = () => axios.put(`${Api}/Investigacion`)
export const DeleteInvestigacion = () => axios.delete(`${Api}/Investigacion`)