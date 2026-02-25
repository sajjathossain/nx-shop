/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WINSTON_MODULE_NEST_PROVIDER, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.File({ filename: 'request.log', level: "info" }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('api-v2', {
            prettyPrint: true,
          }),
        ),
      })
    ]
  })
  const morganStream = { write: (message: string) => logger.info(message.trim()) };

  const globalPrefix = 'api';
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: "*"
  })


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  morgan.token('real-ip', (req: any) => {
    const cfIp = req.headers['cf-connecting-ip'];
    const xRealIp = req.headers['x-real-ip'];
    const xForwardedFor = req.headers['x-forwarded-for'];

    // Handle array case and return first IP
    if (cfIp) return Array.isArray(cfIp) ? cfIp[0] : cfIp;
    if (xRealIp) return Array.isArray(xRealIp) ? xRealIp[0] : xRealIp;
    if (xForwardedFor) {
      const forwarded = Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor;
      // x-forwarded-for can contain multiple IPs, get the first one
      return forwarded.split(',')[0].trim();
    }
    return req.connection.remoteAddress;
  });

  // app.use(morgan(':real-ip - :method :url :status :res[content-length] - :response-time ms :referrer :user-agent'));
  app.use(morgan('combined', { stream: morganStream }));

  const port = process.env.PORT || 4000;
  await app.listen(port, "0.0.0.0");
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
