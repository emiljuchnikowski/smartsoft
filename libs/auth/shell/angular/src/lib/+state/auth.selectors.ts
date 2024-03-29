import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  AUTH_FEATURE_KEY,
  State,
  AuthPartialState,
} from "./auth.reducer";

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector< State>(
  AUTH_FEATURE_KEY
);

export const getAuthLoaded = createSelector(
  getAuthState,
  (state: State) => state.loaded
);

export const getAuthError = createSelector(
  getAuthState,
  (state: State) => state.error
);

export const getAuthToken = createSelector(
  getAuthState,
  (state: State) => state.token
);

export const getAuthUsername = createSelector(
    getAuthState,
    (state: State) => state.username
);
