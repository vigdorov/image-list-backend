import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_CONTROLLER, APP_PORT } from './consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addSecurity('apiKey', {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .setTitle('Image API')
    .setDescription('API для работы с картинками')
    .setVersion('1.0.0')
    .addTag(APP_CONTROLLER)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  console.log(`Application is starting on port ${APP_PORT}`);
  
  await app.listen(APP_PORT);
}
bootstrap();
