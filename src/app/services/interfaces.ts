import { HttpStatusCode } from '../enums/http-status-code';

export interface ResultError {
  status: HttpStatusCode;
  message: string;
}
