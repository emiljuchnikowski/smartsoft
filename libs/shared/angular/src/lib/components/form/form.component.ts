import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter, Inject,
  Input, OnDestroy, Optional,
  Output,
  Type,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";

import {getModelFieldsWithOptions, getModelOptions} from "@smartsoft001/models";
import {ObjectService} from "@smartsoft001/utils";

import { IFormOptions } from "../../models/interfaces";
import {FormFactory} from "../../factories/form/form.factory";
import {IModelExportProvider, MODEL_EXPORT_PROVIDER} from "../../providers/model-export.provider";
import {IModelImportProvider, MODEL_IMPORT_PROVIDER} from "../../providers/model-import.provider";

@Component({
  selector: "smart-form",
  template: `
    <div *ngIf="export || import" style="text-align: right">
      <smart-export *ngIf="export"
                    [value]="options?.control?.value"
                    [handler]="exportHandler"
      ></smart-export>
      <smart-import *ngIf="import"
                    (set)="oSetValue($event)"
                    [accept]="importAccept"
      ></smart-import>
    </div>
      <form *ngIf="form" [formGroup]="form" (ngSubmit)="invokeSubmit.emit(form.value)" (keyup.enter)="invokeSubmit.emit(form.value)">
        <smart-form-standard
            *ngIf="options && type === 'standard'"
            [options]="options"
            [form]="form"
            (invokeSubmit)="invokeSubmit.emit($event)"
        ></smart-form-standard>

        <smart-form-stepper
            *ngIf="options && type === 'stepper'"
            [options]="options"
            [form]="form"
            (invokeSubmit)="invokeSubmit.emit($event)"
        ></smart-form-stepper>
      </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent<T> implements OnDestroy {
  private _options: IFormOptions<T>;
  private _subscription = new Subscription();
  private _mode: "create" | "update" | string;
  private _uniqueProvider: (values: Record<keyof T, any>) => Promise<boolean>;

  form: FormGroup;
  type: "standard" | "stepper";
  export: boolean;
  exportHandler: (val) => void;
  import: boolean;
  importAccept: string;

  @Input() set options(val: IFormOptions<T>) {
    if (!val) return;

    if (!val.treeLevel) val.treeLevel = 1;
    (this.elementRef.nativeElement as HTMLElement).setAttribute('tree-level', val.treeLevel.toString());

    this._options = val;

    this.initLoading();
    this.initType();

    this.initExportImport();

    this._mode = val.mode;
    this._uniqueProvider = val.uniqueProvider;

    if (val.control) {
      this.form = val.control as FormGroup;
      this.registerChanges();
      this.cd.detectChanges();
    } else {
      this.formFactory.create(this._options.model, {
        mode: this._mode,
        uniqueProvider: this._uniqueProvider
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

  constructor(
      private formFactory: FormFactory,
      private cd: ChangeDetectorRef,
      private elementRef: ElementRef,
      @Optional()
      @Inject(MODEL_EXPORT_PROVIDER) public exportProvider: IModelExportProvider,
      @Optional()
      @Inject(MODEL_IMPORT_PROVIDER) public importProvider: IModelImportProvider
  ) { }

  async oSetValue(file: File): Promise<void> {
    let result;

    result = await this.importProvider.convert(this._options.model.constructor as Type<any>, file);

    this._options.model = ObjectService.createByType(result, this.options.model.constructor);

    this.formFactory.create(this._options.model, {
      mode: this._mode,
      uniqueProvider: this._uniqueProvider
    })
        .then(res => {
          this.form.setValue(res.value);
          this.registerChanges();
          this.cd.detectChanges();
        });
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

  private initType() {
    const fieldWithOptions = getModelFieldsWithOptions(this._options.model);

    if (fieldWithOptions.some(fwo => fwo.options.step)) {
      this.type = "stepper";
      return;
    }

    this.type = 'standard';
  }

  private async initExportImport() {
    const modelOptions = getModelOptions(this._options.model.constructor);
    if (modelOptions.export && !this.exportProvider) {
      console.error("exportProvider is not provided");
    }

    if (modelOptions.import && !this.importProvider) {
      console.error("importProvider is not provided");
    }

    this.export = modelOptions.export && !!this.exportProvider;
    this.import = modelOptions.import && !!this.importProvider;

    if (this.import) {
      this.importAccept = await this.importProvider.getAccept(this._options.model.constructor as Type<any>);
      if (this.importProvider) this.cd.detectChanges();
    }

    if (this.export) {
      this.exportHandler = val => {
        this.exportProvider.execute(this._options.model.constructor as Type<any>, val);
      }
    }

    this.cd.detectChanges();
  }
}
