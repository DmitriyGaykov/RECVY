import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { TrimStringFieldPipe } from "@pipes";
import { NotFoundMiddleware } from "@middlewares";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true
  });

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });

  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.useGlobalPipes(new TrimStringFieldPipe());

  await app.listen(3001);
}

bootstrap();
