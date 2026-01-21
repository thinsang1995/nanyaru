import isObject from 'lodash/isObject'
import { AxiosPromise } from 'axios'

type ErrorResponse = {
  message: string
  errors: { [entityName: string]: string[] }
}

/**
 * Transforms any error from axios error into a Jupiter Response error
 */
function transformApiError(e: any): ErrorResponse {
  console.error(e)
  const hasMessage = e?.response?.data?.message && typeof e.response.data.message === 'string'
  const hasErrors = e?.response?.data?.errors && isObject(e.response.data.errors)
  const apiError: ErrorResponse =
    hasMessage || hasErrors ? e?.response?.data : { message: e.message, errors: {} }

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
