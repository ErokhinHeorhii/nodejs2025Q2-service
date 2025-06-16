import { Injectable, LoggerService, Logger } from '@nestjs/common';

@Injectable()
export class CustomLogger implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
