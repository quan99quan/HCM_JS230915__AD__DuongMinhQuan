import axios from "axios"
export default {
    create: async (data) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/todo`, data)
    },
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/todo`)
    },
    update: async (id, data) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/todo/${id}`, data)
    },
    delete: async (id) => {
        return await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/todo/${id}`)
    }
}