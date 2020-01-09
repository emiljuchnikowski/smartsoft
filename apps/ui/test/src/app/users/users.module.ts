import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { SharedModule as RootSharedModule } from "@smartsoft001/angular";
import { AuthModule } from "@smartsoft001/auth-shell-angular";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RootSharedModule,
    AuthModule
  ]
})
export class UsersModule {}
