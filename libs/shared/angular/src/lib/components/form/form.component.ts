import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter, HostBinding,
  Input, OnDestroy,
  Output,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";

import { IFormOptions } from "../../models/interfaces";
import {FormFactory} from "../../factories/form/form.factory";

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
    if (!val) return;

    if (!val.treeLevel) val.treeLevel = 1;
    (this.elementRef.nativeElement as HTMLElement).setAttribute('tree-level', val.treeLevel.toString());

    this._options = val;

    this.initLoading();

    if (val.control) {
      this.form = val.control as FormGroup;
      this.registerChanges();
      this.cd.detectChanges();
    } else {
      this.formFactory.create(this._options.model, {
        mode: val.mode,
        uniqueProvider: val.uniqueProvider
      })
          .then(res => {
            this.form = res;
            this.registerChanges();
            this.cd.detectChanges();
          });
    }
  }
  get options(): IFormOptions<T> {
    return this._options;
  }

  @Output() invokeSubmit = new EventEmitter();
  @Output() valueChange = new EventEmitter<T>();
  @Output() valuePartialChange = new EventEmitter<Partial<T>>();
  @Output() validChange = new EventEmitter<boolean>();

  constructor(private formFactory: FormFactory, private cd: ChangeDetectorRef, private elementRef: ElementRef) {
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

  private registerChanges(): void {
    this._subscription.add(this.form.valueChanges.subscribe(() => {
      this.validChange.emit(this.form.valid);
      this.valueChange.emit(this.form.value);

      const partialModel = {} as Partial<T>;
      Object.keys(this.form.controls)
          .filter(key => !key.endsWith('Confirm') && this.form.controls[key].dirty)
          .forEach(key => {
            partialModel[key] = this.form.controls[key].value;
          });

      this.valuePartialChange.emit(partialModel);
    }));

    this.form.updateValueAndValidity();
  }
}
