import axios, { AxiosError } from 'axios'
import isObject from 'lodash/isObject'
import { ErrorResponse } from '../typing/api'

const instance = axios.create({
  baseURL: '/',
  withCredentials: false,
})

instance.defaults.headers.common.Accept = 'application/json;charset=UTF-8'
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

instance.interceptors.response.use(
  function (response) {
    const contentType = response.headers['content-type']
    // Handle non-json serializable responses
    if (!(contentType && contentType.toLowerCase().includes('application/json'))) {
      throw new Error('Response not processable')
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)

export function handleAPIErrors(e: unknown, cb?: (err: ErrorResponse) => void): ErrorResponse {
  console.error(e)

  const axiosErr = e instanceof AxiosError ? e : null
  const data = axiosErr?.response?.data
  const hasMessage = data?.message && typeof data.message === 'string'
  const hasErrors = data?.errors && isObject(data.errors)
  const apiError: ErrorResponse =
    hasMessage || hasErrors ? data : { message: 'エラーが発生しました', errors: {} }
  if (cb) cb(apiError)

  return apiError
}

export default instance
