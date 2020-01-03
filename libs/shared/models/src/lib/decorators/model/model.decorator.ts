import 'reflect-metadata';

import * as symbols from "../../symbols";
import {IModelOptions} from "../../interfaces";

export const Model = ModelDecorator;
export function ModelDecorator(options: IModelOptions) {
  return function<T>(target: T) {
    Reflect.defineMetadata(symbols.SYMBOL_MODEL, options, target);
  }
}
