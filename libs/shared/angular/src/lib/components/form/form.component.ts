import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  Output,
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { IFormOptions } from "../../models";
import {FormFactory} from "../../factories";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: "smart-form",
  template: `
      <form *ngIf="form" [formGroup]="form" (ngSubmit)="invokeSubmit.emit(form.value)" (keyup.enter)="invokeSubmit.emit(form.value)">
        <smart-form-standard
            *ngIf="options"
            [options]="options"
            [form]="form"
            (invokeSubmit)="invokeSubmit.emit($event)"
        ></smart-form-standard>
      </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent<T> implements OnDestroy {
  private _options: IFormOptions<T>;
  private _subscription = new Subscription();

  form: FormGroup;

  @Input() set options(val: IFormOptions<T>) {
    this._options = val;

    this.initLoading();
    this.formFactory.create(this._options.model)
        .then(res => {
          this.form = res;
          this.cd.detectChanges();
        });
  }
  get options(): IFormOptions<T> {
    return this._options;
  }

  @Output() invokeSubmit = new EventEmitter();

  constructor(private formFactory: FormFactory, private cd: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    if (this._subscription){
      this._subscription.unsubscribe();
    }
  }

  private initLoading(): void {
    if (this._options.loading$) {
      this._subscription.add(this._options.loading$
          .pipe(filter(() => !!this.form))
          .subscribe(val => {
            if (val) {
              this.form.disable();
            } else {
              this.form.enable();
            }
          }));
    }
  }
}
