
import { HttpConfig } from "src/config/config";
import { HttpVerb } from "src/enums/http-enums";
import { HttpRequest, HttpRequestConfig, IHttpRequestConfig, IHttpResponse } from "src/models/http-client/";

export abstract class HttpClientBase {
// #region HttpMethods
  /**
   * @description: HTTP method used to create new resources.
   * @param baseURL: `baseURL` will overwrite the default base URL, `baseURL`. 
   * @param url: `url` is the server URL that will be used for the request. Appended to the `baseUrl`
   * @param config: `config` is the object used to configure the request.
   * @return Promise<resolve, reject>
   */
  public post(baseURL: string, url: string, config?: IHttpRequestConfig): Promise<IHttpResponse | any>;
  public post(baseURL: string, url: string, config: IHttpRequestConfig): Promise<IHttpResponse | any> {
    let nconfig = null;
    if (!config) {
      nconfig = new HttpRequestConfig(HttpVerb.Post, baseURL, url, {}, {}, HttpConfig.DefaultTimeout);
    }

    const request = new HttpRequest(config || nconfig , 0);
    return this.sendRequest(request);
  }

  /**
   * @description: HTTP method used to retrieve data.
   * @param baseURL: `baseURL` will overwrite the default base URL, `baseURL`. 
   * @param url: `url` is the server URL that will be used for the request. Appended to the `baseUrl`
   * @param config: `config` is the object used to configure the request.
   * @return Promise<resolve, reject>
   */
  public get(baseURL: string, url: string, config?: IHttpRequestConfig): Promise<IHttpResponse | any>;
  public get(baseURL: string, url: string, config: IHttpRequestConfig): Promise<IHttpResponse | any> {
    let nconfig = null;
    if (!config) {
      nconfig = new HttpRequestConfig(HttpVerb.Get, baseURL, url, {}, {}, HttpConfig.DefaultTimeout);
    }

    const request = new HttpRequest(config || nconfig , 0);
    return this.sendRequest(request);
  }

  /**
   * @description: HTTP method used to update existing resources.
   * @param baseURL: `baseURL` will overwrite the default base URL, `baseURL`. 
   * @param url: `url` is the server URL that will be used for the request. Appended to the `baseUrl`
   * @param config: `config` is the object used to configure the request.
   * @return Promise<resolve, reject>
   */
  public put(baseURL: string, url: string, config?: IHttpRequestConfig): Promise<IHttpResponse | any>;
  public put(baseURL: string, url: string, config: IHttpRequestConfig): Promise<IHttpResponse | any> {
    let nconfig = null;
    if (!config) {
      nconfig = new HttpRequestConfig(HttpVerb.Put, baseURL, url, {}, {}, HttpConfig.DefaultTimeout);
    }

    const request = new HttpRequest(config || nconfig , 0);
    return this.sendRequest(request);
  }

  /**
   * @description: HTTP method used to delete resources.
   * @param baseURL: `baseURL` will overwrite the default base URL, `baseURL`. 
   * @param url: `url` is the server URL that will be used for the request. Appended to the `baseUrl`
   * @param config: `config` is the object used to configure the request.
   * @return Promise<resolve, reject>
   */
  public delete(baseURL: string, url: string, config?: IHttpRequestConfig): Promise<IHttpResponse | any>;
  public delete(baseURL: string, url: string, config: IHttpRequestConfig): Promise<IHttpResponse | any> {
    let nconfig = null;
    if (!config) {
      nconfig = new HttpRequestConfig(HttpVerb.Delete, baseURL, url, {}, {}, HttpConfig.DefaultTimeout);
    }

    const request = new HttpRequest(config || nconfig , 0);
    return this.sendRequest(request);
  }

  /**
   * @description: request uses the default instance of the axios client created in the class constructor.
   * Custom config is passed to the instance through the options parameter.
   * @param config: Object specifying the request config for the required HTTP method.
   * @return Promise<resolve, reject>
   */
  public abstract sendRequest(request: HttpRequest) : Promise<IHttpResponse | any>
 // #endregion
}