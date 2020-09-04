import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { SharedModule } from "@smartsoft001/angular";
import { AuthModule } from "@smartsoft001/auth-shell-angular";

const routes: Routes = [{ path: "", component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    LoginRoutingModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule {}
