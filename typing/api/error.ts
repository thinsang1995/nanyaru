export type ErrorResponse = {
  message: string
  errors: { [entityName: string]: string[] }
}
