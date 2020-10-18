import {Field, FieldType, Model} from "@smartsoft001/models";

@Model({})
export class Test {
    @Field({})
    test = "asd"
}

@Model({})
export class LoginDto {
    @Field({ required: true, focused: true }) username: string;
    @Field({ required: true }) password: string;

    @Field({
        type: FieldType.object,
        classType: Test
    }) test: Test;

    @Field({})
    test2 = "asd2"

    constructor() {
        this.test = new Test();
    }
}



