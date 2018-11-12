import { HttpVerb } from 'src/enums/http-enums';
import { LogLevel } from 'src/enums/log-level-enum';
import { HttpRequestConfig } from "src/models/http-client/";
import { IBaseService } from './base-service';
import { HttpClient } from './client/http-client';
import { ILogger } from './logger/logger-service';


const baseURL = process.env.REACT_APP_API_URL_BASE + "/api/";
const url = "tweets";

export class EntityService implements IBaseService {
  public static instance: EntityService;
  public client: HttpClient;
  public logger: ILogger;

  constructor(client: HttpClient, logger: ILogger) {
    if (!EntityService.instance) {
      this.client = client;
      this.logger = logger;
      EntityService.instance = this;
    }
    
    return EntityService.instance;
  }

  public createEntities(data: any): Promise<object[]> {
    const config = new HttpRequestConfig(HttpVerb.Post, baseURL, url, { "Content-Type": "application/json" }, data);
    return this.client.post(baseURL, url, config)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        this.logger.log(LogLevel.Error, error.message)
        return Promise.reject(error);
      });
  }

  public getEntities(data: any): Promise<object[]> {
    const config = new HttpRequestConfig(HttpVerb.Get, baseURL, url, { }, data);
    return this.client.get(baseURL, url, config)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        this.logger.log(LogLevel.Error, error.message)
        return Promise.reject(error);
      });
  }

  public updateEntities(data: any): Promise<object[]> {
    const config = new HttpRequestConfig(HttpVerb.Put, baseURL, url, { "Content-Type": "application/json" }, data);

    return this.client.put(baseURL, url, config)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        this.logger.log(LogLevel.Error, error.message)
        return Promise.reject(error);
      });
  }

  public deleteEntities(data: any): Promise<object[]> {
    const config = new HttpRequestConfig(HttpVerb.Delete, baseURL, url, { "Content-Type": "application/json" }, data);
    return this.client.delete(baseURL, url, config)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        this.logger.log(LogLevel.Error, error.message)
        return Promise.reject(error);
      });
  }

}