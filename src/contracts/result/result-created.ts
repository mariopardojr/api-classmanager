import { HttpStatusCode } from './http-status-code';

export class ResultCreated<T> {
  public readonly data: T;

  public readonly isError: false = false;

  public readonly status: HttpStatusCode.CREATED = HttpStatusCode.CREATED;

  public constructor(result: T) {
    this.data = result;
  }
}
