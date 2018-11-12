import { ErrorCodes } from "../../enums/http-enums";
import { IHttpRequest } from "../http-client/http-request";
import { IHttpRequestConfig } from "../http-client/http-request-config";
import { IHttpResponse } from "../http-client/http-response";
import CustomError from './custom-error';

export interface IHttpError {
  message: string;
  request: IHttpRequest;
  code?: ErrorCodes;
  response?: IHttpResponse;
}

export class HttpError extends CustomError implements IHttpError {
  public config: IHttpRequestConfig;
  public code?: ErrorCodes;
  public request: IHttpRequest;
  public response: IHttpResponse;
  public statusCode: string;

  constructor(message: string, request: IHttpRequest, response: IHttpResponse, code?: ErrorCodes) {
    super(message);
    this.code = code;
    this.request = request;
    this.response = response;
    this.statusCode = response.status;
  }
}

export default HttpError;