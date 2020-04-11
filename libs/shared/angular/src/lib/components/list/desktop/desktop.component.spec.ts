import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSortModule, MatTableModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ActionsSubject } from "@ngrx/store";
import { provideMockStore } from '@ngrx/store/testing';

import { ListDesktopComponent } from "./desktop.component";
import { ToastService } from "@smartsoft001/angular";
import { CrudModule } from "@smartsoft001/crud-shell-angular";

describe("DesktopComponent", () => {
  let component: ListDesktopComponent<any>;
  let fixture: ComponentFixture<ListDesktopComponent<any>>;

  beforeEach(async(() => {
    const actionSub: ActionsSubject = new ActionsSubject();
    const initialState = { test: false };

    TestBed.configureTestingModule({
      providers: [
        ToastService,
        provideMockStore({ initialState }),
        { provide: ActionsSubject, useValue: actionSub }
      ],
      imports: [
        CrudModule.forFeature({
          config: {
            type: {},
            entity: "Test",
            apiUrl: "Test"
          },
          routing: false
        }),
        MatTableModule,
        MatSortModule,
        TranslateModule.forRoot(),
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
