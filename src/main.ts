import 'module-alias/register'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    bufferLogs: true
  });
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true
    }
  ));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
