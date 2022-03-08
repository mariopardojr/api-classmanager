import { HttpStatusCode } from './http-status-code'

export class ResultRequestTimeout {
  public readonly errorMessage: string

  public readonly isError: true = true

  public readonly status: HttpStatusCode.REQUEST_TIMEOUT = HttpStatusCode.REQUEST_TIMEOUT

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage
  }
}
