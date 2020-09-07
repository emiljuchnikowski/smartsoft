import "jest-preset-angular";

import { TestBed } from "@angular/core/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

import { ErrorService } from "./error.service";
import { ToastService } from "../toast/toast.service";
import {HttpErrorResponse} from "@angular/common/http";

describe("ErrorService", () => {
  let service: ErrorService;
  const toastMock = {
    error: () => Promise.resolve()
  };
  let translate: TranslateService;
  let toast: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        ErrorService,
        {
          provide: ToastService,
          useValue: toastMock
        }
      ]
    });

    service = TestBed.get(ErrorService);
    translate = TestBed.get(TranslateService);
    toast = TestBed.get(ToastService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("log()", () => {
    it("should invoke specific error when invalid user name or password", async () => {
      const data = {
        ERRORS: {
          invalidUsernameOrPassword: "test error"
        }
      };
      const error = new HttpErrorResponse({
        status: 400,
        statusText: "Bad Request",
        url: "http://test/token",
        error: { details: "Invalid username or password" }
      });
      const spy = jest.spyOn(toast, 'error');

      translate.setTranslation("test", data);
      translate.use("test");
      await service.log(error);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ message: data.ERRORS.invalidUsernameOrPassword });
    });

    it("should invoke other error when custom error", async () => {
      const data = {
        ERRORS: {
          other: "test error"
        }
      };
      const error = new Error();
      const spy = jest.spyOn(toast, 'error');

      translate.setTranslation("test", data);
      translate.use("test");
      await service.log(error);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ message: data.ERRORS.other });
    });
  });
});
