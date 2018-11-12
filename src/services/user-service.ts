import { HttpVerb } from 'src/enums/http-enums';
import { LogLevel } from 'src/enums/log-level-enum';
import { HttpRequestConfig } from "src/models/http-client/";
import { IBaseService } from './base-service';
import HttpClientInstance, { HttpClient } from './client/http-client';
import { ILogger } from './logger/logger-service';

const baseURL = process.env.REACT_APP_API_URL_BASE + "/api/";
const url = "users";

export class UserService implements IBaseService {
  public static instance: UserService;
  public client: HttpClient;
  public logger: ILogger;

  constructor(client: HttpClient, logger?: ILogger) {
    if (!UserService.instance) {
      this.client = client;
      UserService.instance = this;
    }
    
    return UserService.instance;
  }

  public async getUsers(): Promise<object[]> {
    const config = new HttpRequestConfig(HttpVerb.Get, baseURL, url, { }, {});
    return this.client.get(baseURL, url, config)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        // this.logger.log(LogLevel.Error, error.message)
        return Promise.reject(error);
      });
  }
}

const userService = new UserService(HttpClientInstance, undefined);
export default userService;