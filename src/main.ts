import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DEFAULT_FRONTEND_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

function getAllowedOrigins(): string[] {
  const envOrigins = process.env.FRONTEND_ORIGINS;

  if (!envOrigins) {
    return DEFAULT_FRONTEND_ORIGINS;
  }

  return envOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: getAllowedOrigins(),
  });
  await app.listen(3000);
}
bootstrap();
