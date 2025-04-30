import axios from "axios";

const Api = 'http://localhost:3000'

export const subirCategoriaAPI = Categoria => axios.post(`${Api}/Categorias`, Categoria) 
export const GetAllCategoria = () => axios.get(`${Api}/Categorias`)
export const GetIdCategoria = (id) => axios.get(`${Api}/Categorias/${id}`)
export const PutCategoria = () => axios.put(`${Api}/Categorias`)
export const DeleteCategoria = () => axios.delete(`${Api}/Categorias`)

