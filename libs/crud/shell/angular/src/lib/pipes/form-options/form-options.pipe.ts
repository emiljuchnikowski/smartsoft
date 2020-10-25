import { Inject, Optional, Pipe, PipeTransform } from "@angular/core";

import { IEntity } from "@smartsoft001/domain-core";
import { IFormOptions } from "@smartsoft001/angular";

import {
  CRUD_MODEL_POSSIBILITIES_PROVIDER,
  ICrudModelPossibilitiesProvider,
} from "../../providers/model-possibilities/model-possibilities.provider";

@Pipe({
  name: "smartFormOptions",
})
export class FormOptionsPipe<T extends IEntity<string>>
  implements PipeTransform {
  constructor(
    @Optional()
    @Inject(CRUD_MODEL_POSSIBILITIES_PROVIDER)
    private modelPossibilitiesProvider: ICrudModelPossibilitiesProvider
  ) {}

  transform(
    item: T,
    mode: string,
    type: any,
    uniqueProvider?: (values: Record<keyof T, any>) => Promise<boolean>
  ): IFormOptions<T> {
    if (!mode || !type) return null;

    let possibilities = {};

    if (type && this.modelPossibilitiesProvider) {
      possibilities = this.modelPossibilitiesProvider.get(type);
    }

    if (mode === "create") {
      return {
        mode: "create",
        possibilities,
        uniqueProvider,
        model: new type(),
      };
    } else {
      const model = new type();

      if (item) {
        Object.keys(item).forEach((key) => {
          model[key] = item[key];
        });
      }

      return {
        mode: "update",
        uniqueProvider,
        possibilities: possibilities,
        model: model,
      };
    }
  }
}
