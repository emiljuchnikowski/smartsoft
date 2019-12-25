import {Model} from "./model.decorator";
import * as symbols from "../../symbols";
import {IModelField, IModelOptions, ModelType} from "../../models";
import {Field} from "@smartsoft001/shared-utils";

describe("shared-utils: ModelDecorator", () => {

    const options: IModelOptions = {};

    @Model(options)
    class TestClass {

        @Field({})
        test1 =  2;

        test2: "test"

    }

    let instance: TestClass;

    beforeEach(() => {
       instance = new TestClass();
    });

    it('should mark model type', () => {
        expect(instance[symbols.SYMBOL_TYPE]).toBe(ModelType.Model);
    });

    it('should mark model options', () => {
        expect(instance[symbols.SYMBOL_OPTIONS]).toBe(options);
    });

    it('should return model fields', () => {
        const fields = instance[symbols.SYMBOL_FIELDS] as Array<IModelField>;
        expect(fields).toBeTruthy();
        expect(fields.length).toBe(2);
    });

});
