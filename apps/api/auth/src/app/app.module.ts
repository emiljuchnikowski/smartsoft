import { Module } from '@nestjs/common';

import {AuthShellNestjsModule} from "@smartsoft001/auth-shell-nestjs";

@Module({
  imports: [
      AuthShellNestjsModule
  ]
})
export class AppModule {}
