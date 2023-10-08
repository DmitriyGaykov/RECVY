import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true
  });

  app.setGlobalPrefix('/api')

  await app.listen(3001);
}

bootstrap();