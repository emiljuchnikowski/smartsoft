import {Field, FieldType, Model} from "@smartsoft001/models";

@Model({})
export class TransCreateDto<T> {
    @Field({ required: true, type: FieldType.currency }) amount: number;
    @Field({ required: true, type: FieldType.text }) system: 'payu';
    @Field({ required: true, type: FieldType.object }) data: T;
}
