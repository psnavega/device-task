class RequestError extends Error {
  statusCode: number
  constructor (error?: string, statusCode?: number) {
    super(error ?? 'Request Error')
    this.statusCode = statusCode ?? 500
  }
}

export { RequestError }
