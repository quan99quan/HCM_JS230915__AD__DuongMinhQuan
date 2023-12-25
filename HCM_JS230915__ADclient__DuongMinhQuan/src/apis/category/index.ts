import axios from "axios";
const prefix = "categories";
export default {
    update: async (id: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/${prefix}/${id}`, data)
    },
    create: async (title: string) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}`, { title })
    }
}