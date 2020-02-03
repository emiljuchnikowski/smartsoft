import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.URL_PREFIX) {
    app.setGlobalPrefix(process.env.URL_PREFIX)
  }

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [ 'Location', 'authorization', 'content-type' ]
  });

  const port = process.env.port || 3334;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
