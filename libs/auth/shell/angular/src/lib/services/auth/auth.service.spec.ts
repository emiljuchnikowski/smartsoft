import "jest-preset-angular";

import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AuthService } from "./auth.service";
import { AuthConfig } from "../../auth.config";

describe("auth-shell-angular: AuthService", () => {

  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: AuthConfig, useValue: {} }]
    });

    service = TestBed.get(AuthService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
