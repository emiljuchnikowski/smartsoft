import { Component, OnInit } from '@angular/core';

import {Field, Model} from "@smartsoft001/models";
import {IFormOptions} from "@smartsoft001/angular";

@Component({
  selector: 'smartsoft-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  formOptions: IFormOptions<Test> = {
    model: new Test()
  };

  constructor() { }

  ngOnInit() {
  }

}

@Model({})
export class Test {
  @Field({})
  firstName: string;
  @Field({ required: true })
  lastName: string;
  @Field({ required: true })
  password: string;
}
