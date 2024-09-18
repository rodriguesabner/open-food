import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //se tiver um dominio especifico, colocar o dominio no lugar do *,
  //ex: app.enableCors({ origin: '/v4\.com$/', credentials: true });
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
