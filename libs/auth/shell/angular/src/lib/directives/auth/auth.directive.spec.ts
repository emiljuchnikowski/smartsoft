import "jest-preset-angular";

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

import { AuthDirective } from "./auth.directive";
import { AuthService } from "../../services/auth/auth.service";

describe("auth-angular: AuthDirective", () => {
  @Component({
    template: `
      <div *smartAuth>
        <div id="test"></div>
      </div>

      <div *smartAuth="['admin']">
        <div id="test2"></div>
      </div>
    `
  })
  class TestComponent {}

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthDirective, TestComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => true,
            expectPermissions: () => true
          }
        }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
  });

  it("should hide element when not authorize", () => {
    jest.spyOn(service, "isAuthenticated").mockReturnValue(false);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css("#test"));
    expect(element).not.toBeTruthy();
  });

  it("should show element when authorize", () => {
    jest.spyOn(service, "isAuthenticated").mockReturnValue(true);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css("#test"));
    expect(element).toBeTruthy();
  });

  it("should hide element when not contains permissions", () => {
    jest.spyOn(service, "isAuthenticated").mockReturnValue(true);
    jest.spyOn(service, "expectPermissions").mockReturnValue(false);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css("#test2"));
    expect(element).not.toBeTruthy();
  });

  it("should show element when contains permissions", () => {
    jest.spyOn(service, "isAuthenticated").mockReturnValue(true);
    jest.spyOn(service, "expectPermissions").mockReturnValue(true);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css("#test2"));
    expect(element).toBeTruthy();
  });

  it("should hide element when contains permissions and authorize", () => {
    jest.spyOn(service, "isAuthenticated").mockReturnValue(false);
    jest.spyOn(service, "expectPermissions").mockReturnValue(true);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css("#test2"));
    expect(element).not.toBeTruthy();
  });
});
