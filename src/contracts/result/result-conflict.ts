import { HttpStatusCode } from './http-status-code';

export class ResultConflict {
  public readonly errorMessage: string;

  public readonly isError: true = true;

  public readonly status: HttpStatusCode.CONFLICT = HttpStatusCode.CONFLICT;

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}
