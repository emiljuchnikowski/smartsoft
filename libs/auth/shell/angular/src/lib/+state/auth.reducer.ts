import { createReducer, on, Action } from "@ngrx/store";

import * as AuthActions from "./auth.actions";
import { IAuthToken } from "@smartsoft001/auth-domain";

export const AUTH_FEATURE_KEY = "auth";

export interface State {
  token?: IAuthToken;
  username?: string;
  loaded: boolean; // has the Auth list been loaded
  error?: string | null; // last none error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  loaded: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.initToken, AuthActions.createToken, state => ({
    ...state,
    loaded: false,
    error: null,
    token: null,
      username: null
  })),
  on(
    AuthActions.initTokenSuccess,
    AuthActions.createTokenSuccess,
    (state, { token, username }) => {
      return {
        ...state,
        loaded: true,
        token,
          username
      };
    }
  ),
  on(
    AuthActions.initTokenFailure,
    AuthActions.createTokenFailure,
    AuthActions.removeTokenFailure,
    (state, { error }) => ({ ...state, error, loaded: true })
  ),
  on(AuthActions.removeToken, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(AuthActions.removeTokenSuccess, state => ({
    ...state,
    loaded: true,
    token: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
