import { HttpStatusCode } from './http-status-code'

export class ResultSuccess<T> {
  public readonly data: T

  public readonly isError: false = false

  public readonly status: HttpStatusCode.SUCCESS = HttpStatusCode.SUCCESS

  public constructor(result: T) {
    this.data = result
  }
}
