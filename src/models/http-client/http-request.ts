import { HttpRequestStatus } from "../../enums/http-enums";
import Guid from "../guid";
import { IHttpRequestConfig } from "./http-request-config";

export interface IHttpRequest {
  id: Guid;
  config: IHttpRequestConfig;
  status: HttpRequestStatus;
  retries: number;
}

export class HttpRequest implements IHttpRequest {
  public id: Guid;
  public config: IHttpRequestConfig;
  public status: HttpRequestStatus;
  public retries: number;

  constructor(config: IHttpRequestConfig, retries: number = 0) {
    this.id = new Guid();
    this.config = config;
    this.status = HttpRequestStatus.Pending;
    this.retries = retries;
  }
}

export default HttpRequest;