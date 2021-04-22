import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";

import {InputBaseComponent} from "../base/base.component";
import {IButtonOptions, IFormOptions} from "../../../models";
import {FormFactory} from "../../../factories/form/form.factory";

@Component({
    selector: 'smart-input-array',
    templateUrl: './array.component.html',
    styleUrls: ['./array.component.scss'],
})
export class InputArrayComponent<T, TChild> extends InputBaseComponent<T> implements OnInit {
    childOptions: IFormOptions<TChild>[];
    addButtonOptions: IButtonOptions = {
        click: async () => {
            (this.internalOptions.control as FormArray).push(await this.factory.create(
                new this.fieldOptions.classType(), { mode: this.internalOptions.mode }
            ));
            this.initData();
        }
    };

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
            let model = this.internalOptions.model[this.internalOptions.fieldKey];

            if (!model || !model.length) {
                model = new this.fieldOptions.classType();
            }

            return {
                mode: this.internalOptions.mode,
                control,
                model
            }
        });
    }
}
