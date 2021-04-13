import {Field, FieldType, IFieldModifyMetadata, Model} from "@smartsoft001/models";
import {IEntity} from "@smartsoft001/domain-core";
import {of} from "rxjs";

const modifyMetdata : IFieldModifyMetadata = {
    required: true
};

@Model({
    filters: [
        {
            label: 'testNegation',
            key: 'body',
            type: '!=',
        },
        {
            label: 'fromDate',
            key: 'createDate',
            type: '<=',
            fieldType: FieldType.dateWithEdit
        },
        {
            label: 'select',
            key: 'type',
            type: '=',
            fieldType: FieldType.radio,
            possibilities$: of([
                {
                    id: 1, text: 'Test 1'
                },
                {
                    id: 2, text: 'Test 2'
                }
            ])
        }
    ]
})
export class Todo implements IEntity<string> {
    id: string;

    @Field({
        create: modifyMetdata,
        update: modifyMetdata,
        details: true,
        list: { order: 1 },
        info: `
            <b>Test</b> new
        `
    })
    number: string;

    @Field({
        create: modifyMetdata,
        update: {
            ...modifyMetdata,
            multi: true
        },
        details: true,
        list: { order: 2 }
    })
    body: string;

    @Field({
        create: modifyMetdata,
        update: modifyMetdata,
        details: true,
        confirm: true,
        possibilities: {
            strength: true
        },
        list: { order: 2 }
    })
    password: string;

    @Field({
        create: modifyMetdata,
        update: modifyMetdata,
        details: true,
        list: { order: 2 },
        type: FieldType.check,
        possibilities: [
            {
                id: 1, text: 'Test 1'
            },
            {
                id: 2, text: 'Test 2'
            },
            {
                id: 3, text: 'Test 3'
            },
            {
                id: 4, text: 'Test 4'
            },
            {
                id: 5, text: 'Test 5'
            },
            {
                id: 6, text: 'Test 6'
            }
        ]
    })
    tags: Array<string>;

    @Field({
        create: modifyMetdata,
        update: {
            ...modifyMetdata,
            multi: true
        },
        details: true,
        list: { order: 3, filter: true },
        type: FieldType.flag
    })
    done: boolean;

    @Field({
        create: modifyMetdata,
        update: {
            ...modifyMetdata,
            multi: true
        },
        details: true,
        list: { order: 3, filter: true },
        type: FieldType.email
    })
    email: string;

    @Field({
        create: modifyMetdata,
        update: {
            ...modifyMetdata,
            multi: true
        },
        details: true,
        list: { order: 3, filter: true },
        type: FieldType.phoneNumber
    })
    numberPersonal: string;

    @Field({
        create: modifyMetdata,
        update: {
            ...modifyMetdata,
            multi: true
        },
        details: true,
        list: { order: 3, filter: true },
        type: FieldType.pesel
    })
    myPesel: string;
}
