import { HttpStatusCode } from './http-status-code'

export class ResultBadRequest {
  public readonly errorMessage: string

  public readonly isError: true = true

  public readonly status: HttpStatusCode.BAD_REQUEST = HttpStatusCode.BAD_REQUEST

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage
  }
}
