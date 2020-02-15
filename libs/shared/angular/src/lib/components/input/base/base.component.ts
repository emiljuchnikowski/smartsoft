import {ChangeDetectorRef, Input} from "@angular/core";
import { AbstractControl } from "@angular/forms";

import { InputOptions } from "../../../models";
import {  IFieldOptions } from "@smartsoft001/models";
import {Observable} from "rxjs";

export abstract class InputBaseComponent<T> {
  private _options: InputOptions<T>;

  translateKey: string;
  control: AbstractControl;

  possibilities$: Observable<{ id: any, text: string }[]>;

  @Input() fieldOptions: IFieldOptions;
  @Input() set options(val: InputOptions<T>) {
    if (!val) return;

    this._options = val;
    this.control = this._options.control;
    this.setTranslateKey();

    this.possibilities$ = val.possibilities$;

    this.afterSetOptionsHandler();

    this.cd.detectChanges();
  }

  constructor(protected cd: ChangeDetectorRef) { }

  protected afterSetOptionsHandler(): void {

  }

  private setTranslateKey(): void {
    this.translateKey = "MODEL." + this._options.fieldKey;
  }
}
