import {Component, OnInit, ViewChild} from '@angular/core';

import {AuthFacade} from "../../+state/auth.facade";
import {FormComponent, IButtonOptions, IFormOptions} from "@smartsoft001/angular";
import {LoginDto} from "@smartsoft001/auth-shell-dtos";

@Component({
  selector: 'smart-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  buttonOptions: IButtonOptions = {
    type: 'submit'
  };
  formOptions: IFormOptions<LoginDto> = {
    model: new LoginDto()
  };

  @ViewChild(FormComponent, { read: FormComponent, static: false })
  component: FormComponent<LoginDto>;

  constructor(facade: AuthFacade) { }

  ngOnInit() {
  }

}
