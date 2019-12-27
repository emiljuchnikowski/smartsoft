import * as symbols from "../../symbols";
import {Field} from "./field.decorator";
import {IFieldOptions} from "../../interfaces";
import {Model} from "@smartsoft001/shared-models";

describe("shared-models: FieldDecorator", () => {

    const options: IFieldOptions = {};

    @Model({})
    class TestClass {
        @Field(options)
        testField = '';
    }

    const instance = new TestClass();

    it('should mark field metadata', () => {
        const has = Reflect.hasMetadata(symbols.SYMBOL_FIELD, instance, 'testField');
        expect(has).toBeTruthy();
    });

    it('should mark model options', () => {
        const res = Reflect.getMetadata(symbols.SYMBOL_FIELD, instance, 'testField');
        expect(res).toBe(options);
    });
});
