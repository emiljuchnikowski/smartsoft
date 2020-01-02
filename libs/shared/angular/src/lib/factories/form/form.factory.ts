import 'reflect-metadata';

import {Injectable} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

import {getModelFieldKeys, IFieldOptions, SYMBOL_FIELD, SYMBOL_MODEL} from "@smartsoft001/models";

@Injectable()
export class FormFactory {

    constructor(private fb: FormBuilder) { }

    static checkModelMeta<T>(obj: T) {
        if (!obj)
            throw new Error('You should set object as param');

        if (!Reflect.hasMetadata(SYMBOL_MODEL, obj.constructor))
            throw new Error('You should mark class with @Model decorator');
    }

    static setValidators(control: AbstractControl, options: IFieldOptions): void {
        const result = [];

        if (options.required) {
            result.push(Validators.required);
        }

        control.setValidators(result);
    }

    static getOptions<T>(obj: T, key: string): IFieldOptions {
        return Reflect.getMetadata(SYMBOL_FIELD, obj, key);
    }

    async create<T>(obj: T): Promise<FormGroup> {
        FormFactory.checkModelMeta(obj);

        const result = this.fb.group({});

        getModelFieldKeys(obj.constructor)
            .forEach(key => {
                const options: IFieldOptions = FormFactory.getOptions(obj, key);
                const control = this.fb.control(null);

                FormFactory.setValidators(control, options);

                result.addControl(key, control);
            });

        return result;
    }
 }
