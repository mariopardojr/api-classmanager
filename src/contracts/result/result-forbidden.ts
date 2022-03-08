import { HttpStatusCode } from './http-status-code'

export class ResultForbidden {
  public readonly errorMessage: string

  public readonly isError: true = true

  public readonly status: HttpStatusCode.FORBIDDEN = HttpStatusCode.FORBIDDEN

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage
  }
}
