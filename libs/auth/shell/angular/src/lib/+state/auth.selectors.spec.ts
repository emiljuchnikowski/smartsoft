import "jest-preset-angular";

import { State, initialState } from "./auth.reducer";
import * as AuthSelectors from "./auth.selectors";

describe("auth-shell-angular:Auth Selectors", () => {
  const ERROR_MSG = "No Error Available";
  let state: { auth: State };

  beforeEach(() => {
    state = {
      auth: initialState
    };
  });

  describe("Auth Selectors", () => {

    it("getAuthError() should return the list of Auth", () => {
      state.auth.error = ERROR_MSG;

      const result = AuthSelectors.getAuthError(state);

      expect(result).toBe(ERROR_MSG);
    });

    it("getAuthToken() should return token", () => {
      state.auth.token = { } as any;

      const result = AuthSelectors.getAuthToken(state);

      expect(result).toBe(state.auth.token);
    });

    it("getAuthLoaded() should return loader", () => {
      state.auth.loaded = true;

      const result = AuthSelectors.getAuthLoaded(state);

      expect(result).toBeTruthy();
    });

  });
});
