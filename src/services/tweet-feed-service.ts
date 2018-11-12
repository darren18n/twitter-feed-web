import { HttpVerb } from 'src/enums/http-enums';
import { LogLevel } from 'src/enums/log-level-enum';
import { HttpRequestConfig } from "src/models/http-client/";
import { IBaseService } from './base-service';
import HttpClientInstance, { HttpClient } from './client/http-client';
import { ILogger } from './logger/logger-service';

const baseURL = process.env.REACT_APP_API_URL_BASE + "/api/";
const url = "tweets";

export class TweetFeedService implements IBaseService {
  public static instance: TweetFeedService;
  public client: HttpClient;
  public logger: ILogger;

  constructor(client: HttpClient, logger?: ILogger) {
    if (!TweetFeedService.instance) {
      this.client = client;
      TweetFeedService.instance = this;
    }
    
    return TweetFeedService.instance;
  }

  public async createTweet(): Promise<object[]> {
    const config = new HttpRequestConfig(HttpVerb.Post, baseURL, url, { "Content-Type": "application/json" }, {});
    return this.client.post(baseURL, url, config)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        this.logger.log(LogLevel.Error, error.message)
        return Promise.reject(error);
      });
  }

  public async getTweets(): Promise<object[]> {
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

  public async deleteTweets(data: any): Promise<object[]> {
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

const tweetFeedService = new TweetFeedService(HttpClientInstance, undefined);
export default tweetFeedService;
