import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateModule} from "@ngx-translate/core";

import { LoginComponent } from './login.component';
import {IFormOptions, SharedModule} from "@smartsoft001/angular";
import {LoginDto} from "@smartsoft001/auth-shell-dtos";
import {AuthFacade} from "@smartsoft001/auth-shell-angular";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authFacade: AuthFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ { provide: AuthFacade, useValue: { login: () => {} } } ],
      imports: [
          SharedModule, TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authFacade = TestBed.get(AuthFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formOptions', () => {
    it('should set new model', () => {
      const option: IFormOptions<LoginDto> = {
        model: new LoginDto()
      };

      expect(component.formOptions).toStrictEqual(option);
    });
  });

  describe('buttonOptions', () => {
    it('should set type submit', () => {
      expect(component.buttonOptions.type).toStrictEqual('submit');
    });

    it('should invoke login', () => {
      const spy = jest.spyOn(component, 'login');

      component.buttonOptions.click();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('submit()', () => {
    it('should send form value', () => {
      const value = component.formComponent.form.value;
      const spy = jest.spyOn(authFacade, 'login');

      component.login();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(value);
    });
  });
});
