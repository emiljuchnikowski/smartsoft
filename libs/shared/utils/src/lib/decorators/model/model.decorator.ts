import * as symbols from "../../symbols";
import {IModel, IModelField, IModelOptions, ModelType} from "../../models";

export const Model = ModelDecorator;
export function ModelDecorator(options: IModelOptions) {
  return function<T extends { new (...args: any[]): {} }>(
    constructor: T
  ) {
    return class extends constructor implements IModel {
      [symbols.SYMBOL_TYPE] = ModelType.Model as ModelType.Model;
      [symbols.SYMBOL_OPTIONS] = options;
      [symbols.SYMBOL_FIELDS] = [];
    };
  }
}
