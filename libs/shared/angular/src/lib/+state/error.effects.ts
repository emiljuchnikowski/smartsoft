import { Injectable } from "@angular/core";
import { createEffect, Actions } from "@ngrx/effects";
import { filter, tap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import {Observable} from "rxjs";

import {ErrorService} from "../services";

@Injectable()
export class ErrorEffects {
  error$: Observable<any> = createEffect(
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
