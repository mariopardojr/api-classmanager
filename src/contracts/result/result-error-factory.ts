import { ResultRequestTimeout } from './request-timeout';
import { ResultBadRequest } from './result-bad-request';
import { ResultError } from './result-error';
import { ResultNotFound } from './result-not-found';
import { ResultForbidden } from './result-forbidden';
import { HttpStatusCode } from './http-status-code';
import { Result } from './result';

const HttpStatusCodeToClass = {
  [HttpStatusCode.REQUEST_TIMEOUT]: ResultRequestTimeout,
  [HttpStatusCode.BAD_REQUEST]: ResultBadRequest,
  [HttpStatusCode.NOT_FOUND]: ResultNotFound,
  [HttpStatusCode.FORBIDDEN]: ResultForbidden,
};

export class ResultErrorFactory {
  static getClass(error: Error) {
    // @ts-ignore
    if (error?.response?.status in HttpStatusCodeToClass) {
      // @ts-ignore
      return HttpStatusCodeToClass[error?.response?.status];
    }

    return ResultError;
  }

  // @ts-ignore
  static create(error: Error): Result {
    const ErrorType = ResultErrorFactory.getClass(error);
    // @ts-ignore
    return new ErrorType(error?.response?.data?.message || error.message);
  }
}
