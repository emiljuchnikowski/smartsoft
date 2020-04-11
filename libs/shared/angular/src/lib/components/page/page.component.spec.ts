import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { Renderer2, Type } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";

import { PageComponent } from "./page.component";
import { SharedModule } from "@smartsoft001/angular";

describe("shared-angular: PageComponent", () => {
  let renderer2: Renderer2;
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule,
        SharedModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<
      Renderer2
    >);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    it("should set 100% height", () => {
      const spy = jest.spyOn(renderer2, "setStyle");

      component.ngOnInit();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expect.anything(), "height", "100%");
    });
  });
});
