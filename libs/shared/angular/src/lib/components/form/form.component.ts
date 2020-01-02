import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { IFormOptions } from "../../models";
import {FormFactory} from "../../factories";

@Component({
  selector: "smart-form",
  template: `
      <form *ngIf="form" [formGroup]="form" (ngSubmit)="invokeSubmit.emit(form.value)">
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
export class FormComponent<T> {
  private _options: IFormOptions<T>;

  form: FormGroup;

  @Input() set options(val: IFormOptions<T>) {
    this._options = val;

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
}
