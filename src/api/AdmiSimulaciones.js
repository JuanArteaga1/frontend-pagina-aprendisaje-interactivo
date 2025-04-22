import axios from "axios";

const Api = 'http://localhost:3000'

export const subirSimulacionesAPI = Simulaciones => axios.post(`${Api}/Simulaciones`, Simulaciones)

export const GetAllSimulaciones = () => axios.get(`${Api}/Simulaciones`)
export const GetIdSimulaciones = (id) => axios.get(`${Api}/Simulaciones/${id}`)
export const PutSimulaciones = () => axios.put(`${Api}/Simulaciones`)
export const DeleteSimulaciones = () => axios.delete(`${Api}/Simulaciones`)