import { HttpClient } from './client/http-client';
import { ILogger } from './logger/logger-service';


export interface IBaseService {
  client: HttpClient;
  logger: ILogger;
}
