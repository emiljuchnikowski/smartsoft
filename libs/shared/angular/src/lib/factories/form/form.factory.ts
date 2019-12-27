import 'reflect-metadata';

import {Injectable} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

import {IModelOptions, SYMBOL_FIELD, SYMBOL_MODEL} from "@smartsoft001/shared-models";


@Injectable()
export class FormFactory {

    constructor(private fb: FormBuilder) { }

    static checkModelMeta<T>(obj: T) {
        if (!Reflect.hasMetadata(SYMBOL_MODEL, obj.constructor))
            throw new Error('You should mark class with @Model decorator');
    }

    async create<T>(obj: T): Promise<FormGroup> {
        FormFactory.checkModelMeta(obj);

        const result = this.fb.group({});

        const options: IModelOptions = Reflect.getMetadata(SYMBOL_MODEL, obj.constructor);

        if (!options.fields) return result;

        options.fields
            .filter(key => {
                return Reflect.hasMetadata(SYMBOL_FIELD, obj, key);
            })
            .forEach(key => {
                result.addControl(key, this.fb.control(null));
            });

        return result;
    }
}
