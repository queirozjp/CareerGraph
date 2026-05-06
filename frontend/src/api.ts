import axios from "axios"

const api = axios.create({
    baseURL: "http://172.20.10.3:8080"
})

export default api;