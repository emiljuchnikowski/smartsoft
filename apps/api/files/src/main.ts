import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as fastifyMulipart from "fastify-multipart";

import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  if (process.env.URL_PREFIX) {
    app.setGlobalPrefix(process.env.URL_PREFIX);
  }

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Location", "authorization", "content-type"]
  });

  app.enableShutdownHooks();

  app.register(fastifyMulipart);

  const options = new DocumentBuilder()
    .setTitle("Files and streaming Server")
    .setDescription("Stream files.")
    .addTag("File")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(
    process.env.URL_PREFIX ? process.env.URL_PREFIX + "/_docs" : "_docs",
    app,
    document
  );

  const port = process.env.port || 3334;
  await app.listen(Number(port), '0.0.0.0', () => {
    console.log("Listening at http://localhost:" + port);
  });
}

bootstrap();
