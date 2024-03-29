import axios from "axios";
import globals from "../config/globals";
import { responseHandler } from "../handlers/handleResponse";

const api = axios.create({
    baseURL: globals().publicUrl,
})

api.defaults.headers.common['Content-Type'] = 'application/json'

api.interceptors.response.use(
    (response) => {
      return responseHandler(response)
    },
    (error) => {
      return Promise.reject(error)
    },
  )

export default api