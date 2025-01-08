import 'module-alias/register'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    bufferLogs: true
  });
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
    }
  ));

  const config = new DocumentBuilder()
    .setTitle('Desafio Luizalabs')
    .setDescription('Api para cadastro de clientes e lista de produtos favoritos')
    .setVersion('1.0')
    .addTag('customers, products, favorites')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory), {
    jsonDocumentUrl: 'swagger/json'
  };

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
