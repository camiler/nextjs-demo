import { message } from 'antd'
import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 3000,
  baseURL: 'http://localhost:4000'
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.headers = {
        'Content-Type': 'application/json'
      }
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

axiosInstance.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data
  } else {
    message.error(response.statusText)
    return null
  }
})

const {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete
} = axiosInstance
export { apiGet, apiPost, apiPut, apiDelete }
export default axiosInstance
