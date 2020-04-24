import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";

import { InputIntComponent } from "./int.component";

describe("IonicIntComponent", () => {
  let component: InputIntComponent<any>;
  let fixture: ComponentFixture<InputIntComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputIntComponent],
      imports: [TranslateModule, IonicModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
