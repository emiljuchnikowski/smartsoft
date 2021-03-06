import { MonoTypeOperatorFunction, Subject } from "rxjs";
import {Directive, OnDestroy} from "@angular/core";
import { takeUntil } from "rxjs/operators";

@Directive()
export abstract class BaseComponent implements OnDestroy {
  protected get takeUntilDestroy(): MonoTypeOperatorFunction<any> {
    return takeUntil(this.destroy$);
  }

  protected destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
