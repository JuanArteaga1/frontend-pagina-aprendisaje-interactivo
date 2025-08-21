import axios from "axios";

const Api = import.meta.env.VITE_RUTA1;// tu IP local aquí


export const subirSimulacionesAPI = Simulaciones => axios.post(`${Api}/Simulaciones`, Simulaciones)
export const GetAllSimulaciones = () => axios.get(`${Api}/Simulaciones`)
export const GetIdSimulaciones = (id) => axios.get(`${Api}/Simulaciones/${id}`)
export const PutSimulaciones = (id,Simulaciones) => axios.put(`${Api}/Simulaciones/${id}`,Simulaciones)
export const DeleteSimulaciones = (id) => axios.delete(`${Api}/Simulaciones/${id}`)