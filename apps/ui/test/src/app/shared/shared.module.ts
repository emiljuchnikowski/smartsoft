import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { SharedRoutingModule } from "./shared-routing.module";
import { SharedComponent } from "./shared.component";
import { SharedModule as RootSharedModule } from "@smartsoft001/angular";
import { AuthModule } from "@smartsoft001/auth-shell-angular";
import {CrudModule} from "@smartsoft001/crud-shell-angular";

const routes: Routes = [{ path: "", component: SharedComponent }];

@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule.forChild(routes),
    RootSharedModule,
    AuthModule,CrudModule.forFeature({
      entity: 'test',
      apiUrl: 'http://localhost:8102/test'
    }),
    CrudModule.forFeature({
      entity: 'shared',
      apiUrl: 'http://localhost:8102/shared'
    })
  ]
})
export class SharedModule {}
