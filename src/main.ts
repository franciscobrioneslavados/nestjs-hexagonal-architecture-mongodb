import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import HttpExceptionFilter from './infrastructure/exceptions/http-exception.filter';

const logger = new Logger('MAIN');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useLogger(new Logger());
  app.enableCors({
    origin: ['*'],
    methods: ['*'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.use('/api/healthz', (req, res) => {
    const message = 'healthz OK';
    logger.log(message);
    res.send(message);
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(AppModule.port);
}
bootstrap();
