import memberApi from "./member"
import categogyApi from "./category"
import './axios.instance'
export const api = {
    member: memberApi,
    category: categogyApi
}