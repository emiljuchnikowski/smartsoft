import { createAction, props } from "@ngrx/store";

import {IAuthToken} from "@smartsoft001/auth-domain";



/*
 * Init token
 */
export const initToken = createAction("[Auth] Init token");

export const initTokenSuccess = createAction(
  "[Auth] Init Token Success",
  props<{ token: IAuthToken, username: string }>()
);

export const initTokenFailure = createAction(
  "[Auth] Init Token Failure",
  props<{ error: any }>()
);

/*
 * Create token
 */
export const createToken = createAction(
    "[Auth] Create token",
    props<{ username: string, password: string, customData? }>()
);

export const createTokenSuccess = createAction(
    "[Auth] Create Token Success",
    props<{ token: IAuthToken, username: string }>()
);

export const createTokenFailure = createAction(
    "[Auth] Create Token Failure",
    props<{ error: any }>()
);

/*
 * Login FB
 */
export const loginFB = createAction(
    "[Auth] Login FB"
);

export const loginFBSuccess = createAction(
    "[Auth] Login FB Success",
    props<{ token: IAuthToken, username: string }>()
);

export const loginFBFailure = createAction(
    "[Auth] Login FB Failure",
    props<{ error: any }>()
);

/*
 * Login Google
 */
export const loginGoogle = createAction(
    "[Auth] Login Google"
);

export const loginGoogleSuccess = createAction(
    "[Auth] Login Google Success",
    props<{ token: IAuthToken, username: string }>()
);

export const loginGoogleFailure = createAction(
    "[Auth] Login Google Failure",
    props<{ error: any }>()
);

/*
 * Remove token
 */
export const removeToken = createAction("[Auth] Remove token");

export const removeTokenSuccess = createAction("[Auth] Remove Token Success");

export const removeTokenFailure = createAction(
    "[Auth] Remove Token Failure",
    props<{ error: any }>()
);
