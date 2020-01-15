import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";

import { DetailsComponent } from "./details.component";
import {DetailsStandardComponent} from "./standard/standard.component";
import {DETAIL_COMPONENTS} from "../detail";

describe("shared-angular: DetailsComponent", () => {
  let component: DetailsComponent<any>;
  let fixture: ComponentFixture<DetailsComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsComponent,
          DetailsStandardComponent,
          ...DETAIL_COMPONENTS
      ],
      imports: [
        IonicModule.forRoot(),
        TranslateModule,
        CommonModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
