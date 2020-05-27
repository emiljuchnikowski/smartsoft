import { NgModule } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { readFirst } from "@nrwl/angular/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule, Store } from "@ngrx/store";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { NxModule } from "@nrwl/angular";

import { AuthEffects } from "./auth.effects";
import { AuthFacade } from "./auth.facade";
import * as AuthActions from "../+state/auth.actions";
import { AUTH_FEATURE_KEY, State, reducer } from "./auth.reducer";
import {AuthService} from "../services/auth/auth.service";
import {AuthConfig} from "../auth.config";
import {RouterTestingModule} from "@angular/router/testing";

interface TestSchema {
  auth: State;
}

describe("auth-shell-angular: AuthFacade", () => {
  let facade: AuthFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe("used in NgModule", () => {
    beforeEach(() => {
      @NgModule({
        imports: [
            RouterTestingModule,
          StoreModule.forFeature(AUTH_FEATURE_KEY, reducer),
          EffectsModule.forFeature([AuthEffects]),
            HttpClientTestingModule
        ],
        providers: [AuthFacade, AuthService, { provide: AuthConfig, useValue: {} }]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(AuthFacade);
    });

    describe("init()", () => {
      it("should return null token with loaded == true", async done => {
        try {
          let token = await readFirst(facade.token$);
          let isLoaded = await readFirst(facade.loaded$);

          expect(token).not.toBeDefined();
          expect(isLoaded).toBe(false);

          facade.init();

          token = await readFirst(facade.token$);
          isLoaded = await readFirst(facade.loaded$);

          expect(!!token).not.toBeTruthy();
          expect(isLoaded).toBe(true);

          done();
        } catch (err) {
          done.fail(err);
        }
      });

      it("should dispose action", () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.init();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(AuthActions.initToken());
      });
    });

    describe("logout()", () => {
      it("should dispose action", () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.logout();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(AuthActions.removeToken());
      });
    });

    describe("login()", () => {
      it("should dispose action", () => {
        const spy = jest.spyOn(store, 'dispatch');
        const model = { username: 'user', password: 'pass' };

        facade.login(model);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(AuthActions.createToken(model));
      });
    });
  });
});
