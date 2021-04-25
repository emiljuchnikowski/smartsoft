import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";

import {ObjectService} from "@smartsoft001/utils";

import {InputBaseComponent} from "../base/base.component";
import {IButtonOptions, IFormOptions} from "../../../models";
import {FormFactory} from "../../../factories/form/form.factory";
import {FieldType, getModelFieldOptions, IFieldOptions} from "@smartsoft001/models";

@Component({
    selector: 'smart-input-array',
    templateUrl: './array.component.html',
    styleUrls: ['./array.component.scss'],
})
export class InputArrayComponent<T, TChild> extends InputBaseComponent<T> implements OnInit {
    childOptions: Array<IFormOptions<TChild> & { fieldOptions: IFieldOptions }>;
    addButtonOptions: IButtonOptions = {
        click: async () => {
            (this.internalOptions.control as FormArray).push(await this.factory.create(
                new this.fieldOptions.classType(), { mode: this.internalOptions.mode }
            ));
            this.initData();
        }
    };

    FieldType = FieldType;

    constructor(cd: ChangeDetectorRef,  private factory: FormFactory) {
        super(cd);
    }

    protected afterSetOptionsHandler() {
        this.initData();
    }

    onRemove(index: number) {
        (this.internalOptions.control as FormArray).removeAt(index);
        this.initData();
    }

    ngOnInit() {}

    private initData(): void {
        this.childOptions = (this.internalOptions.control as FormArray).controls.map(control => {

            console.log(this.internalOptions.fieldKey);

            if (this.internalOptions.model[0] && this.internalOptions.model[0][this.internalOptions.fieldKey]) {
                const options = getModelFieldOptions(this.internalOptions.model[0], this.internalOptions.fieldKey);

                return {
                    mode: this.internalOptions.mode,
                    control,
                    model : ObjectService.createByType(control.value, options.classType),
                    fieldOptions: options
                } as IFormOptions<TChild> & { fieldOptions: IFieldOptions };
            } else {
                const options = getModelFieldOptions(this.internalOptions.model, this.internalOptions.fieldKey);

                return {
                    mode: this.internalOptions.mode,
                    control,
                    model : ObjectService.createByType(control.value, options.classType),
                    fieldOptions: options
                } as IFormOptions<TChild> & { fieldOptions: IFieldOptions };
            }
        });
    }
}
