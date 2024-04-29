import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT: string = process.env.PORT || '3000';
  await app.listen(PORT, () => {
    console.log('Running API on port: ' + PORT);
  });
}
bootstrap().then();
