import { createAction, props } from "@ngrx/store";

import {IAuthToken} from "@smartsoft001/auth-domain";

/*
 * Init token
 */
export const initToken = createAction("[Auth] Init token");

export const initTokenSuccess = createAction(
  "[Auth] Init Token Success",
  props<{ token: IAuthToken }>()
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
    props<{ username: string, password: string }>()
);

export const createTokenSuccess = createAction(
    "[Auth] Create Token Success",
    props<{ token: IAuthToken }>()
);

export const createTokenFailure = createAction(
    "[Auth] Create Token Failure",
    props<{ error: any }>()
);
