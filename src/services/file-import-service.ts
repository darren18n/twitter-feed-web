import { ContentTypes, HttpVerb } from 'src/enums/http-enums';
import { LogLevel } from 'src/enums/log-level-enum';
import { HttpRequestConfig } from "src/models/http-client/";
import { IBaseService } from './base-service';
import HttpClientInstance, { HttpClient } from './client/http-client';
import { ILogger } from './logger/logger-service';


const baseURL = process.env.REACT_APP_API_URL_BASE + "/api/";
const url = "import";

export class FileImportService implements IBaseService {
  public static instance: FileImportService;
  public client: HttpClient;
  public logger: ILogger;

  constructor(client: HttpClient, logger?: ILogger) {
    if (!FileImportService.instance) {
      this.client = client;
      // this.logger = logger;
      FileImportService.instance = this;
    }
    
    return FileImportService.instance;
  }

  public async importFiles(data: FormData): Promise<object[]> {
    const config = new HttpRequestConfig(HttpVerb.Post, baseURL, url, { "Content-Type": ContentTypes.MultipartFormData }, data);
    return this.client.post(baseURL, url, config)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        // this.logger.log(LogLevel.Error, error.message)
        return Promise.reject(error);
      });
  }

}

const FileImportServiceInstance = new FileImportService(HttpClientInstance, undefined);
export default FileImportServiceInstance;