import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { TrimStringFieldPipe } from "@pipes";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true
  });

  app.enableCors({
    origin: 'http://localhost:5173', // Замените на ваш адрес клиента
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Если вы используете авторизацию с куки или заголовками
  });

  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.useGlobalPipes(new TrimStringFieldPipe());

  await app.listen(3001);
}

bootstrap();
