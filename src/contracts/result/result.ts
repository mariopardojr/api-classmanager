import { ResultRequestTimeout } from './request-timeout';
import { ResultBadRequest } from './result-bad-request';
import { ResultError } from './result-error';
import { ResultNotFound } from './result-not-found';
import { ResultForbidden } from './result-forbidden';
import { ResultSuccess } from './result-success';
import { ResultConflict } from './result-conflict';
import { ResultCreated } from './result-created';

export type Result<S = undefined> =
  | ResultSuccess<S>
  | ResultCreated<S>
  | ResultError
  | ResultNotFound
  | ResultForbidden
  | ResultBadRequest
  | ResultRequestTimeout
  | ResultConflict;
