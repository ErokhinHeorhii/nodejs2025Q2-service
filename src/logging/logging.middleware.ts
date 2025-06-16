import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query } = req;
    const startTime = Date.now();

    // Логируем запрос
    this.logger.log(
      `Request: ${method} ${originalUrl} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`,
    );

    // Перехватываем ответ
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;

      // Логируем ответ
      this.logger.log(
        `Response: ${method} ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms`,
      );
    });

    next();
  }
} 