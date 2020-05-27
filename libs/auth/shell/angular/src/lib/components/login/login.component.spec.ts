import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateModule} from "@ngx-translate/core";
import {of} from "rxjs";

import {IFormOptions, SharedModule} from "@smartsoft001/angular";
import {LoginDto} from "@smartsoft001/auth-shell-dtos";
import {AuthFacade} from "@smartsoft001/auth-shell-angular";

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authFacade: AuthFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ { provide: AuthFacade, useValue: { login: () => {}, loaded$: of(false) } } ],
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

      expect(component.formOptions.model).toStrictEqual(option.model);
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

    it('should set loading from facade', done => {
      authFacade.loaded$ = of(false);

      component.buttonOptions.loading$.subscribe(val => {
        expect(val).toBeTruthy();
        done();
      });
    });
  });

  describe('submit()', () => {
    it('should dont send form value when invalid', () => {
      const spy = jest.spyOn(authFacade, 'login');

      component.login();

      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should send form value when valid', () => {
      const spy = jest.spyOn(authFacade, 'login');

      component.formComponent.form.controls['username'].setValue('test');
      component.formComponent.form.controls['password'].setValue('test');
      component.formComponent.form.updateValueAndValidity();
      component.login();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ username: 'test', password: 'test' });
    });

    it('should clear password', () => {
      component.formComponent.form.controls['username'].setValue('test');
      component.formComponent.form.controls['password'].setValue('test');
      component.formComponent.form.updateValueAndValidity();
      component.login();

      expect(component.formComponent.form.controls['password'].value).toBe('');
    });
  });
});
