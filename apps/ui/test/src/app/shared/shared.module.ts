import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { SharedModule as RootSharedModule } from "@smartsoft001/angular";

const routes: Routes = [
  { path: '', component: SharedComponent }
];

@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule.forChild(routes),
    RootSharedModule
  ]
})
export class SharedModule { }
