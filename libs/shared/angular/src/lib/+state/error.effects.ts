import { Injectable } from "@angular/core";
import { createEffect, Actions } from "@ngrx/effects";

import {ErrorService} from "../services";
import { filter, tap } from "rxjs/operators";
import { Action } from "@ngrx/store";

@Injectable()
export class ErrorEffects {
  error$ = createEffect(
    () =>
      this.actions$.pipe(
        filter(action => {
          return action.type.indexOf(" Failure") > -1;
        }),
        tap((action: Action & { error }) => {
          this.service.log(action.error);
        })
      ),
      { dispatch: false }
  );

  constructor(private actions$: Actions, private service: ErrorService) {}
}
