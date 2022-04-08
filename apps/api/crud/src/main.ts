import { NestFactory } from '@nestjs/core';
import * as bodyParser from "body-parser";
import { WsAdapter } from '@nestjs/platform-ws';


import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({limit: '100mb'}))
  app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

  if (process.env.URL_PREFIX) {
    app.setGlobalPrefix(process.env.URL_PREFIX)
  }

  // app.useWebSocketAdapter(new WsAdapter(app));

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
