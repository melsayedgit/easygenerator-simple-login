import { Injectable } from '@nestjs/common';
import pino, { Logger } from 'pino';
import * as PinoPretty from 'pino-pretty';

@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor() {
    const prettyStream = PinoPretty({
      colorize: true,
      translateTime: 'SYS:standard',
    });

    this.logger = pino(prettyStream);
  }

  public log(message: string) {
    this.logger.info(message);
  }

  public error(message: string) {
    this.logger.error(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }

  public debug(message: string) {
    this.logger.debug(message);
  }

  public verbose(message: string) {
    this.logger.trace(message);
  }
}
