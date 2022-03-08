import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, ElementRef, Injector,
  Input,
  OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import * as _ from 'lodash';

import {InputOptions} from "../../models/interfaces";
import {FieldType, getModelFieldOptions, getModelFieldsWithOptions, IFieldOptions} from "@smartsoft001/models";
import {InputBaseComponent} from "./base/base.component";
import {StyleService} from "../../services";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ObjectService} from "@smartsoft001/utils";

@Component({
  selector: 'smart-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent<T> implements OnInit {

  private _options: InputOptions<T>;

  status: any;
  fieldOptions: IFieldOptions;
  FieldType = FieldType;

  @ViewChild('componentRef', {read: ViewContainerRef}) componentRef: ViewContainerRef;

  @Input() set options(val: InputOptions<T>) {
    this._options = val;
    let key = this._options.fieldKey;

    if (key && key.endsWith('Confirm')) {
      key = key.replace('Confirm', '');
    }

    let fieldOptions = getModelFieldOptions(this._options.model, key);
    if (!fieldOptions && this._options.model[0]) fieldOptions = getModelFieldOptions(this._options.model[0], key);
    if (!fieldOptions) {
      fieldOptions = getModelFieldsWithOptions(this._options.model).find(x => x.key === key)?.options;
    }

    if (val.mode === 'create' && _.isObject(fieldOptions.create)) {
      fieldOptions = {
        ...fieldOptions,
        ...(fieldOptions.create as IFieldOptions)
      };
    } else if (val.mode === 'update' && _.isObject(fieldOptions.update)) {
      fieldOptions = {
        ...fieldOptions,
        ...(fieldOptions.update as IFieldOptions)
      };
    }

    this.fieldOptions = fieldOptions;

    this.initCustomComponent().then();

    this.options.control.statusChanges.subscribe(status => {
      this.status = status;
      (this.injector.get(ChangeDetectorRef) as ChangeDetectorRef).detectChanges();
    });
  }
  get options(): InputOptions<T> {
    return this._options;
  }

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private injector: Injector
  ) { }

  oSetValue($event: any): void {
    if (!$event) return;

    if (this.options.control instanceof FormArray) {
      this.options.control.clear();
    }

    setTimeout(() => {
      this.options.control.setValue($event);
    });
  }

  async ngOnInit(): Promise<void> {
    await this.initStyles();
  }

  private async initStyles() {
    const styleService = await this.injector.get(StyleService);
    const elementRef = await this.injector.get(ElementRef);

    styleService.init(elementRef);
  }

  private async initCustomComponent(): Promise<void> {
    if (!this.options.component) return;

    await new Promise<void>(res => res());

    const componentFactory = this.componentFactoryResolver
        .resolveComponentFactory<InputBaseComponent<any>>(this.options.component);

    const viewContainerRef = this.componentRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory, 0, this.injector);

    componentRef.instance.options = this.options;
    componentRef.instance.fieldOptions = this.fieldOptions;
  }
}
