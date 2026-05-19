import axios from "axios"

const api = axios.create({
    baseURL: "http://3.89.56.41:8080"
})

api.interceptors.request.use(config => {

    const token = localStorage.getItem("token")

    if(token){
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api;