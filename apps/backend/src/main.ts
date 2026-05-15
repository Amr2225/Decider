import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const webOrigin = config.getOrThrow<string>('WEB_ORIGIN');
  const port = config.get<number>('PORT') ?? 3001;

  app.enableCors({
    origin: [webOrigin],
    credentials: true,
  });

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1/')
  await app.listen(port);
}

bootstrap();
