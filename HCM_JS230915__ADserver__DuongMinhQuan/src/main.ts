import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  /* Version Api */
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["1"]
  })
  /* Global Validate */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  await app.listen(process.env.SV_PORT);
}
bootstrap();
