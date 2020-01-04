import { Module } from '@nestjs/common';

import {CrudShellNestjsModule} from "@smartsoft001/crud-shell-nestjs";

@Module({
  imports: [
      CrudShellNestjsModule.forRoot()
  ]
})
export class AppModule {}
