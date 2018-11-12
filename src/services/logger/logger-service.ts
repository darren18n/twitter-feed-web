import { LogLevel } from 'src/enums/log-level-enum';

export interface ILogger {
  log(logLevel: LogLevel, message: string): void;
  clear(): void;
}

class LoggerService implements ILogger {
  public static instance: LoggerService;
  public logSinks: any[];
  constructor() {
    if (!LoggerService.instance) {
      LoggerService.instance = this;
    }

    return LoggerService.instance;
  }

  public log(logLevel: LogLevel, message: string): void {
    this.logSinks.forEach(sink => {
      sink.log(logLevel, message);
    });
  }

  public clear() : void {
    this.logSinks.forEach(sink => {
      sink.clear();
    });
  }
}

const logger = new LoggerService();
export default logger;