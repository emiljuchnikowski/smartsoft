import {Model} from "./model.decorator";
import * as symbols from "../../symbols";
import {IModelOptions} from "../../interfaces";

describe("shared-models: ModelDecorator", () => {

    const options: IModelOptions = {};

    @Model(options)
    class TestClass {

    }

    it('should mark model metadata', () => {
        const has = Reflect.hasMetadata(symbols.SYMBOL_MODEL, TestClass);
        expect(has).toBeTruthy();
    });

    it('should mark model options', () => {
        const res = Reflect.getMetadata(symbols.SYMBOL_MODEL, TestClass);
        expect(res).toBe(options);
    });
});
