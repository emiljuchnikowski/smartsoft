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
    type: 'submit',
    click: () => this.login()
  };
  formOptions: IFormOptions<LoginDto> = {
    model: new LoginDto()
  };

  @ViewChild(FormComponent, { read: FormComponent, static: false })
  formComponent: FormComponent<LoginDto>;

  constructor(private facade: AuthFacade) { }

  login(): void {
    this.facade.login(this.formComponent.form.value);
  }

  ngOnInit() {
  }

}
