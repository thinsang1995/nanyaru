import isObject from 'lodash/isObject'
import { AxiosError, AxiosPromise } from 'axios'

type ErrorResponse = {
  message: string
  errors: { [entityName: string]: string[] }
}

/**
 * Transforms any error from axios error into a Jupiter Response error
 */
function transformApiError(e: unknown): ErrorResponse {
  console.error(e)
  const axiosErr = e instanceof AxiosError ? e : null
  const data = axiosErr?.response?.data
  const hasMessage = data?.message && typeof data.message === 'string'
  const hasErrors = data?.errors && isObject(data.errors)
  const msg = e instanceof Error ? e.message : 'エラーが発生しました'
  const apiError: ErrorResponse =
    hasMessage || hasErrors ? data : { message: msg, errors: {} }

  return apiError
}

/**
 * Returns T back from API where T is the response you expect back from the Jupiter API
 * Will rethrow errors transformed into {JupiterErrorResponse} type
 * */
export default async function transformResponse<T>(req: AxiosPromise<T>): Promise<T> {
  try {
    const response = await req
    return response.data
  } catch (e) {
    throw transformApiError(e)
  }
}
