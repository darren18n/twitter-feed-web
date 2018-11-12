import { ErrorCodes } from "../../enums/http-enums";
import { IHttpRequest } from "../http-client/http-request";
import CustomError from './custom-error';
import { IHttpError } from './http-error';

export class TimeoutError extends CustomError implements IHttpError {
  public code: ErrorCodes;
  public request: IHttpRequest;

  constructor(message: string, request: IHttpRequest) {
    super(message);
    this.code = ErrorCodes.Etimeout;
    this.request = request;
  }
}

export default TimeoutError;