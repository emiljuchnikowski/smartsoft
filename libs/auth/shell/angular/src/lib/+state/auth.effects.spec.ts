import "jest-preset-angular";

import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {TestScheduler} from "rxjs/testing";
import {Observable, of} from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { NxModule, DataPersistence } from "@nrwl/angular";

import { AuthEffects } from "./auth.effects";
import * as AuthActions from "./auth.actions";
import { AuthService } from "../services";
import { AuthConfig } from "../auth.config";

describe("auth-shell-angular: AuthEffects", () => {
  let actions: Observable<any>;
  let effects: AuthEffects;
  let service: AuthService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientTestingModule],
      providers: [
        AuthEffects,
        AuthService,
        { provide: AuthConfig, useValue: {} },
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    effects = TestBed.get(AuthEffects);
    service = TestBed.get(AuthService);
  });

  describe("initToken$", () => {
    it("should work", () => {
      scheduler.run(({ hot, expectObservable }) => {
        actions = hot("-a-|", {a: AuthActions.initToken()});

        const expected = "-a-|";

        expectObservable(effects.initToken$).toBe(expected, {
          a: AuthActions.initTokenSuccess({token: null})
        });
      });
    });
  });

  describe("createToken$", () => {
    it("should work", () => {
      scheduler.run(({ hot, expectObservable }) => {
        const data = {
          username: "testName1",
          password: "testPassword1"
        };
        const token = {} as any;
        jest.spyOn(service, 'createToken').mockReturnValue(of(token));

        actions = hot("-a-|", {a: AuthActions.createToken(data)});

        const expected = "-a-|";

        expectObservable(effects.createToken$).toBe(expected, {
          a: AuthActions.createTokenSuccess({token})
        });
      });
    });

    it("should throw error", () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const data = {
          username: "testName1",
          password: "testPassword1"
        };
        const failureAction = AuthActions.createTokenFailure({ error: {} });
        const action = AuthActions.createToken(data);

        actions = hot("5ms a", { a: action });
        jest.spyOn(service, 'createToken').mockReturnValue(cold('1s #', null, failureAction.error));

        const expected = "5ms 1s z";

        expectObservable(effects.createToken$).toBe(expected, {
          z: failureAction
        });
      });
    });
  });

  describe("removeToken$", () => {
    it("should work", () => {
      scheduler.run(({ hot, expectObservable }) => {
        actions = hot("-a-|", {a: AuthActions.removeToken()});
        jest.spyOn(service, 'removeToken').mockReturnValue(of({} as any));

        const expected = "-a-|";

        expectObservable(effects.removeToken$).toBe(expected, {
          a: AuthActions.removeTokenSuccess()
        });
      });
    });

    it("should throw error", () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const failureAction = AuthActions.removeTokenFailure({ error: {} });
        const action = AuthActions.removeToken();

        actions = hot("5ms a", { a: action });
        jest.spyOn(service, 'removeToken').mockReturnValue(cold('1s #', null, failureAction.error));

        const expected = "5ms 1s z";

        expectObservable(effects.removeToken$).toBe(expected, {
          z: failureAction
        });
      });
    });
  });

  describe("refreshToken$", () => {
    it("should work", () => {
      scheduler.run(({ hot, expectObservable }) => {
        actions = hot("-a-|", {a: AuthActions.refreshToken()});
        jest.spyOn(service, 'refreshToken').mockReturnValue(of({} as any));

        const expected = "-a-|";

        expectObservable(effects.refreshToken$).toBe(expected, {
          a: AuthActions.refreshTokenSuccess()
        });
      });
    });

    it("should throw error", () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const failureAction = AuthActions.refreshTokenFailure({ error: {} });
        const action = AuthActions.refreshToken();

        actions = hot("5ms a", { a: action });
        jest.spyOn(service, 'refreshToken').mockReturnValue(cold('1s #', null, failureAction.error));

        const expected = "5ms 1s z";

        expectObservable(effects.refreshToken$).toBe(expected, {
          z: failureAction
        });
      });
    });
  });
});
