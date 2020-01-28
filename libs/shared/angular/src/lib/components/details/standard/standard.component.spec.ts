import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";

import { DetailsStandardComponent } from "./standard.component";
import { DETAIL_COMPONENTS } from '../../../shared.module';

describe("shared-angular: DetailsStandardComponent", () => {
  let component: DetailsStandardComponent<any>;
  let fixture: ComponentFixture<DetailsStandardComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsStandardComponent,
          ...DETAIL_COMPONENTS
      ],
      imports: [
        ReactiveFormsModule,
        IonicModule.forRoot(),
        TranslateModule.forRoot()
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DetailsStandardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
