import { Component, OnInit } from '@angular/core';

import {IButtonOptions, IFormOptions} from "@smartsoft001/angular";
import {TransCreateDto} from "@smartsoft001/trans-shell-dtos";
import {Model} from "@smartsoft001/models";
import {HttpClient} from "@angular/common/http";

@Model({})
export class CustomDto extends TransCreateDto<any> {

}

@Component({
  selector: "smartsoft-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  formOptions: IFormOptions<CustomDto>;
  item: any;
  buttonOptions: IButtonOptions = {
    click: async () => {
      const res = await this.http.post<{ url }>('http://localhost:3334/', this.item).toPromise();

      document.location.href = res.url;
    }
  };

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    const model = new CustomDto();
    model.amount = 100;
    model.name = 'Test zakup';
    model.data = {
      test1: 1,
      test2: '2'
    };
    model.system = 'payu';

    this.formOptions = {
      model: model
    };
  }

  onChange($event: any) {}

  onValidChange($event: boolean) {}
}
