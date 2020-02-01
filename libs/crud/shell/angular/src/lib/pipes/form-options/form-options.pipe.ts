import { Pipe, PipeTransform } from '@angular/core';

import {IEntity} from "@smartsoft001/domain-core";
import {IFormOptions} from "@smartsoft001/angular";

@Pipe({
  name: 'smartFormOptions'
})
export class FormOptionsPipe<T extends IEntity<string>> implements PipeTransform {
  transform(item: T, mode: string, type: any): IFormOptions<T> {
    if (!mode || !type) return null;

    if (mode === "create") {
      return {
        mode: "create",
        model: new type()
      };
    } else {
      const model = new type();

      if (item) {
        Object.keys(item).forEach(key => {
          model[key] = item[key];
        });
      }

      return {
        mode: "update",
        model: model
      };
    }
  }

}
