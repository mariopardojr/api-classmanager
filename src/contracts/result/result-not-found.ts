import { HttpStatusCode } from './http-status-code'

export class ResultNotFound {
  public readonly errorMessage: string

  public readonly isError: true = true

  public readonly status: HttpStatusCode.NOT_FOUND = HttpStatusCode.NOT_FOUND

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage
  }
}
