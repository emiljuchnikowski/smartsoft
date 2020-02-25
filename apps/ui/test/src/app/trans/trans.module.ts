import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

import { TransRoutingModule } from "./trans-routing.module";
import { SharedModule } from "@smartsoft001/angular";
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, TransRoutingModule, SharedModule, HttpClientModule]
})
export class TransModule {}
