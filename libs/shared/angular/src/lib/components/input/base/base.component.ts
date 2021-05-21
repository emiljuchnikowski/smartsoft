import { ChangeDetectorRef, Input, Directive } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import {Observable} from "rxjs";

import {  IFieldOptions } from "@smartsoft001/models";

import { InputOptions } from "../../../models";
import {BaseComponent} from "../../base";

@Directive()
export abstract class InputBaseComponent<T> extends BaseComponent {
  internalOptions: InputOptions<T>;
  control: AbstractControl;

  possibilities$: Observable<{ id: any, text: string }[]>;

  @Input() fieldOptions: IFieldOptions;
  @Input() set options(val: InputOptions<T>) {
    if (!val) return;

    this.internalOptions = val;
    this.control = this.internalOptions.control;

    this.possibilities$ = val.possibilities$;

    this.afterSetOptionsHandler();

    this.cd.detectChanges();
  }

  protected constructor(protected cd: ChangeDetectorRef) {
    super();
  }

  protected afterSetOptionsHandler(): void {

  }
}
