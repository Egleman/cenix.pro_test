import axios from 'axios'

const instance = axios.create()

// Функция обёртка над любой HTTP-клиент библиоткой
export const api = {
  async response_func (url: string, method: string, body?: any) {
    try {
      const response =
        method !== 'get'
          ? await instance[method](url, body)
          : await instance[method](url, { params: body })
      return response.data
    } catch (e) {
      console.log(e)
      return e.response.data
    }
  },
  async get (url: string, params?: any) {
    return await this.response_func(url, 'get', params)
  },
  async post (url: string, body?: any) {
    return await this.response_func(url, 'post', body)
  },
  async patch (url: string, body?: any) {
    return await this.response_func(url, 'patch', body)
  },
  async del (url: string, body?: any) {
    return await this.response_func(url, 'delete', body)
  },
  async put (url: string, body?: any) {
    return await this.response_func(url, 'put', body)
  },
}
