import { HttpStatusCode } from './http-status-code'

export class ResultError {
  public readonly errorMessage: string

  public readonly isError: true = true

  public readonly status: HttpStatusCode.INTERNAL_SERVER_ERROR = HttpStatusCode.INTERNAL_SERVER_ERROR

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage
  }
}
