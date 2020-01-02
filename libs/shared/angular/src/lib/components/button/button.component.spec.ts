import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import {IonicModule} from "@ionic/angular";
import {IButtonOptions} from "@smartsoft001/angular";

describe('shared-angular: ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],
      imports: [ IonicModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('click()', () => {
    it('should invoke options method',  () => {
      const options: IButtonOptions = {
        click: () => {}
      };
      const spy = jest.spyOn(options, 'click');
      component.options = options;
      const button = fixture.debugElement.nativeElement.querySelector('ion-button');

      fixture.detectChanges();
      button.click();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  })
});
