import "reflect-metadata";

import {Injectable} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators,} from "@angular/forms";
import * as _ from "lodash";

import {
  FieldType,
  getModelFieldsWithOptions,
  IFieldEditMetadata,
  IFieldModifyMetadata,
  IFieldOptions,
  IFieldUniqueMetadata,
  SYMBOL_FIELD,
  SYMBOL_MODEL,
} from "@smartsoft001/models";
import {ZipCodeService} from "@smartsoft001/utils";
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class FormFactory {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  static checkModelMeta<T>(obj: T) {
    if (!obj) throw new Error("You should set object as param");

    if (!Reflect.hasMetadata(SYMBOL_MODEL, obj.constructor))
      throw new Error("You should mark class with @Model decorator");
  }

  static getOptions<T>(obj: T, key: string): IFieldOptions {
    return Reflect.getMetadata(SYMBOL_FIELD, obj, key);
  }

  static getOptionsFromMode(
    options: IFieldOptions,
    mode?: "create" | "update" | string
  ): IFieldOptions {
    let result = options;

    if (!mode) return result;

    if (mode === "create" && _.isObject(options.create)) {
      result = {
        ...options,
        ...(options.create as IFieldModifyMetadata),
      };
    } else if (mode === "update" && _.isObject(options.update)) {
      result = {
        ...options,
        ...(options.update as IFieldModifyMetadata),
      };
    }

    return result;
  }

  async create<T>(
    obj: T,
    ops: {
      mode?: "create" | "update" | "multiUpdate" | string;
      uniqueProvider?: (values: Record<string, any>) => Promise<boolean>;
    } = {}
  ): Promise<FormGroup> {
    FormFactory.checkModelMeta(obj);

    const result = this.fb.group({});

    const fields = getModelFieldsWithOptions(obj).filter((field) => {
      return (
        !ops.mode ||
        (ops.mode === "create" && field.options.create) ||
        (ops.mode === "update" && field.options.update) ||
        (ops.mode === "multiUpdate" && (field.options?.update as IFieldEditMetadata)?.multi) ||
        (ops.mode !== "create" &&
          ops.mode !== "update" &&
          field.options.customs &&
          field.options.customs.some((custom) => custom.mode === ops.mode))
      );
    });

    for (let index = 0; index < fields.length; index++) {
      const field = fields[index];
      let control: AbstractControl = null;

      const options = FormFactory.getOptionsFromMode(field.options, ops.mode);

      if (options.permissions && !this.authService.expectPermissions(options.permissions)) {
        continue;
      }

      if (field.options.type === FieldType.object) {
        control = await this.create(obj[field.key], ops);
      } else {
        control = this.createControl(obj, field, options.required);
      }

      this.setValidators(
        field.key,
        control,
        options,
        result,
        ops.uniqueProvider
      );

      result.addControl(field.key, control);

      if (options.confirm && options.type === FieldType.object) {
        throw Error("Object not supported confirms");
      }

      if (options.confirm) {
        const confirmControl = this.fb.control(null, [
          Validators.required,
          (a: AbstractControl) => {
            if (a.value !== result.controls[field.key].value) {
              return {
                confirm: true,
              };
            }

            return null;
          },
        ]);

        result.addControl(field.key + "Confirm", confirmControl);
      }
    }

    return result;
  }

  private setValidators(
    key: string,
    control: AbstractControl,
    options: IFieldOptions,
    form: FormGroup,
    uniqueProvider: (values: Record<string, any>) => Promise<boolean>
  ): void {
    const result = [];
    const asyncResult = [];

    if (options.required) {
      result.push(Validators.required);
    }

    if (options.type === FieldType.email) {
      result.push(Validators.email);
    }

    if (options.unique) {
      if (!uniqueProvider) throw Error("Required uniqueProvider");

      asyncResult.push(async (c: AbstractControl) => {
        const record: Record<string, any> = {
          [key]: options.type === FieldType.int ? c.value : `'${ c.value }'`
        };

        if (form.value && (options.unique as IFieldUniqueMetadata).withFields) {
          (options.unique as IFieldUniqueMetadata).withFields.forEach(fieldKey => {
            record[fieldKey] = form.value[fieldKey];
          });
        }

        if (await uniqueProvider(record)) return null;

        return {
          invalidUnique: true
        }
      });
    }

    control.setValidators(result);
    control.setAsyncValidators(asyncResult);
  }

  private createControl<T>(
    obj: T,
    field: { key: string; options: IFieldOptions },
    required: boolean
  ) {
    let result: AbstractControl;

    const zipCodeValidator = (c) => {
      if (c.value && ZipCodeService.isInvalid(c.value)) {
        return {
          invalidZipCode: true,
        };
      }

      return null;
    };

    switch (field.options.type) {
      case FieldType.address:
        result = this.fb.group({
          city: ["", required ? [Validators.required] : null],
          street: ["", required ? [Validators.required] : null],
          buildingNumber: ["", required ? [Validators.required] : null],
          flatNumber: [""],
          zipCode: [
            "",
            required
              ? [Validators.required, zipCodeValidator]
              : [zipCodeValidator],
          ],
        });
        break;
      default:
        result = this.fb.control(null);
        break;
    }

    const value = obj[field.key]
      ? obj[field.key]
      : field.options.defaltValue
      ? field.options.defaltValue()
      : null;

    if (value) result.setValue(value);

    result.updateValueAndValidity();

    return result;
  }
}
