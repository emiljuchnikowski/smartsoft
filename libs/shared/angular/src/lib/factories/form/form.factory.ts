import 'reflect-metadata';

import {Injectable} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as _ from 'lodash';

import {
    FieldType,
    getModelFieldsWithOptions,
    IFieldModifyMetadata,
    IFieldOptions,
    SYMBOL_FIELD,
    SYMBOL_MODEL
} from "@smartsoft001/models";

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

    static getOptionsFromMode(options: IFieldOptions, mode?: 'create' | 'update' | string): IFieldOptions {
        let result = options;

        if (!mode) return result;

        if (mode === 'create' && _.isObject(options.create)) {
            result = {
                ...options,
                ...(options.create as IFieldModifyMetadata)
            };
        } else if (mode === 'update' && _.isObject(options.update)) {
            result = {
                ...options,
                ...(options.update as IFieldModifyMetadata)
            };
        }

        return result;
    }

    async create<T>(obj: T, ops: { mode?: 'create' | 'update' | string } = {}): Promise<FormGroup> {
        FormFactory.checkModelMeta(obj);

        const result = this.fb.group({});

        const fields = getModelFieldsWithOptions(obj)
            .filter(field => {
                return (
                    !ops.mode
                    || (ops.mode === 'create' && field.options.create)
                    || (ops.mode === 'update' && field.options.update)
                    || (
                        (ops.mode !== 'create' && ops.mode !== 'update')
                        && field.options.customs.some(custom => custom.mode === ops.mode)
                    )
                );
            });

        for (let index = 0; index < fields.length; index++) {
            const field = fields[index];
            let control: AbstractControl = null;

            if (field.options.type === FieldType.object) {
                control = await this.create(obj[field.key], ops);
            } else {
                control = this.fb.control(obj[field.key]);
            }

            const options = FormFactory.getOptionsFromMode(field.options, ops.mode);

            FormFactory.setValidators(control, options);

            result.addControl(field.key, control);

            if (options.confirm && options.type === FieldType.object) {
                throw Error('Object not supported confirms');
            }

            if (options.confirm) {
                const confirmControl = this.fb.control(null, [
                    Validators.required,
                    (a: AbstractControl) => {
                        if (a.value !== result.controls[field.key].value) {
                            return {
                                confirm: true
                            }
                        }

                        return null;
                    }
                ]);

                result.addControl(field.key + 'Confirm', confirmControl);
            }
        }

        return result;
    }
 }
