import { DynamicModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CONTROLLERS } from "./controllers";
import { ApiService } from "./services/api/api.service";
import {FileModel} from "./models";

@Module({})
export class FilesApiModule {
  static forRoot(options: {
    db: {
      host: string;
      port: number;
      database: string;
      username?: string;
      password?: string;
    };
  }): DynamicModule {
    return {
      module: FilesApiModule,
      controllers: [...CONTROLLERS],
      providers: [ApiService],
      imports: [
        MongooseModule.forRoot(this.getMongoConnection(options.db), {
          useUnifiedTopology: true,
          useNewUrlParser: true
        }),
        MongooseModule.forFeature([{ name: 'fs.files', schema: FileModel }])
      ]
    };
  }

  private static getMongoConnection(db: {
    host: string;
    port: number;
    database: string;
    username?: string;
    password?: string;
  }): string {
    const userAuth =
      db.username && db.password ? `${db.username}:${db.password}@` : "";

    return `mongodb://${userAuth}${db.host}:${db.port}/${db.database}`;
  }
}
