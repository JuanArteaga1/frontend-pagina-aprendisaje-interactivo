import axios from "axios";

const Api = 'http://localhost:3000'

export const subirPodcastAPI = Podcast => axios.post(`${Api}/Podcast`, Podcast)

export const GetAllPodcast = () => axios.get(`${Api}/Podcast`)
export const GetIdPodcast = (id) => axios.get(`${Api}/Podcast/${id}`)
export const PutPodcast = (id,Podcast) => axios.put(`${Api}/Podcast/${id}`,Podcast)
export const DeletePodcast = (id) => axios.delete(`${Api}/Podcast/${id}`)