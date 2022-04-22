import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    });

    const config = new DocumentBuilder()
      .setTitle('EducateU')
      .setDescription('EducateU REST API Documentation')
      .setVersion('1.0.0')
      .addTag('Martynyk Rostyslav')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
