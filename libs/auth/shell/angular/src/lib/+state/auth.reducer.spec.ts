import "jest-preset-angular";

import * as AuthActions from "./auth.actions";
import { State, initialState, reducer } from "./auth.reducer";

describe("auth-shell-angular:Auth Reducer", () => {

  beforeEach(() => {});

  describe("valid Auth actions", () => {

    it("initToken should set load state", () => {
      const action = AuthActions.initToken();

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.token).toBe(null);
      expect(result.error).toBe(null);
    });

    it("initTokenSuccess should set data to state", () => {
      const token = {} as any;
      const action = AuthActions.initTokenSuccess({ token });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.token).toBe(token);
      expect(!!result.error).toBe(false);
    });

    it("initTokenFailure should set error to state", () => {
      const error = {};
      const action = AuthActions.initTokenFailure({ error });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.token).not.toBeDefined();
      expect(result.error).toBe(error);
    });

    it("createToken should set load state", () => {
      const action = AuthActions.createToken({ username: "test", password: '123' });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.token).toBe(null);
      expect(result.error).toBe(null);
    });

    it("createTokenSuccess should set data to state", () => {
      const token = {} as any;
      const action = AuthActions.createTokenSuccess({ token });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.token).toBe(token);
      expect(!!result.error).toBe(false);
    });

    it("createTokenFailure should set error to state", () => {
      const error = {};
      const action = AuthActions.createTokenFailure({ error });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.token).not.toBeDefined();
      expect(result.error).toBe(error);
    });

    it("removeToken should set load state", () => {
      const action = AuthActions.removeToken();
      initialState.token = {} as any;
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.token).toStrictEqual(initialState.token);
      expect(!!result.error).not.toBeTruthy()
    });

    it("removeTokenSuccess should set data to state", () => {
      const token = {} as any;
      const action = AuthActions.removeTokenSuccess();
      initialState.token = token;

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.token).toBe(null);
      expect(!!result.error).toBe(false);
    });

    it("removeTokenFailure should set error to state", () => {
      const error = {};
      const action = AuthActions.removeTokenFailure({ error });
      initialState.token = {} as any;

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.token).toBe(initialState.token);
      expect(result.error).toBe(error);
    });

  });

  describe("unknown action", () => {
    it("should return the previous state", () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
