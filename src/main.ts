import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT: string = process.env.PORT || '3000';

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Simple API for blog')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log('Running API on port: ' + PORT);
  });
}
bootstrap().then();
