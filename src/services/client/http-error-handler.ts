import { ErrorCodes } from "src/enums/http-enums";
import {CustomError, HttpError, IHttpError, NetworkError, TimeoutError} from "src/models/errors";

class HttpErrorHandler {
  public static mapError(error: IHttpError): HttpError | TimeoutError | NetworkError | CustomError {
    const { code, message, response, request } = error;
    if (response && response.status) {
      const { status } = response;
      const statusValue: number = Math.round(parseInt(status, 10) / 100);
      if (statusValue === 4 || statusValue === 5) {
        // 4xx: Client Error occurred.
        // 5xx: Server Error occurred.
        return new HttpError(message, request, response, code);
      }
    } else if ((code && code === ErrorCodes.EconnAborted) || code === ErrorCodes.Etimeout) {
      // Timeout error occurred.
      return new TimeoutError(message, request);
    } else if (code && code === ErrorCodes.Enetdown) {
      // Network conectivity error occurred.
      return new NetworkError(message, request);
    }

    return new CustomError("An unknown error occured.");
  }
}

export default HttpErrorHandler;
