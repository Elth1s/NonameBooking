import axios from "axios";

const myAxios = axios.create({
    baseURL: "http://localhost:5059/",
    headers: {
        "Content-type": "application/json",
    }
});
myAxios.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default myAxios;

