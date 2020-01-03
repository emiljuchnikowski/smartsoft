import * as symbols from "../../symbols";
import {Field} from "./field.decorator";
import {FieldType, IFieldOptions} from "../../interfaces";
import {Model} from "@smartsoft001/models";

describe("shared-models: FieldDecorator", () => {

    const options: IFieldOptions = {};

    @Model({})
    class TestClass {
        @Field(options)
        testField = '';

        @Field(options)
        password = '';
    }

    const instance = new TestClass();

    it('should mark field metadata', () => {
        const has = Reflect.hasMetadata(symbols.SYMBOL_FIELD, instance, 'testField');
        expect(has).toBeTruthy();
    });

    it('should mark field info in definition', () => {
        expect(TestClass['__fields']).toStrictEqual({ testField: true, password: true });
    });

    it('should mark model options', () => {
        const res = Reflect.getMetadata(symbols.SYMBOL_FIELD, instance, 'testField');
        expect(res).toStrictEqual({ ...options, type: FieldType.text });
    });

    it('should set default type as text', () => {
        const res: IFieldOptions = Reflect.getMetadata(symbols.SYMBOL_FIELD, instance, 'testField');
        expect(res.type).toBe(FieldType.text);
    });

    it('should set default type as password when key is password', () => {
        const res: IFieldOptions = Reflect.getMetadata(symbols.SYMBOL_FIELD, instance, 'password');
        expect(res.type).toBe(FieldType.password);
    });
});
