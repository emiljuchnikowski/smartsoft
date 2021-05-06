import {Field, FieldType, IFieldModifyMetadata, ISpecification, Model} from "@smartsoft001/models";
import {IEntity} from "@smartsoft001/domain-core";
import {of} from "rxjs";

const modifyMetdata : IFieldModifyMetadata = {
    required: true
};

export enum CourseSectionItemType {
    pdf = "pdf",
    video = "video",
    test = "test"
}

export class CoursesSectionsItemByTypeSpecification implements ISpecification {
    readonly criteria: Partial<CourseSectionItem>;

    constructor(type: CourseSectionItemType) {
        this.criteria = { type };
    }
}

@Model({
    titleKey: 'answer'
})
export class CourseTestAnswer {
    @Field({
        create: true,
        update: true,
        required: true
    })
    answer: string;

    @Field({
        create: true,
        update: true,
        type: FieldType.flag
    })
    correct: boolean;
}

@Model({
    titleKey: 'question'
})
export class CourseTestQuestion {
    @Field({
        create: true,
        update: true,
        required: true
    })
    question: string;

    @Field({
        create: true,
        update: true,
        type: FieldType.array,
        required: true,
        classType: CourseTestAnswer
    })
    answers: Array<CourseTestAnswer>;

    constructor() {
        this.answers = [];
    }
}

@Model({})
export class CourseTest {
    @Field({
        create: true,
        update: true,
        type: FieldType.array,
        required: true,
        classType: CourseTestQuestion
    })
    questions: Array<CourseTestQuestion>;

    constructor() {
        this.questions = [];
    }
}

@Model({
    titleKey: 'type'
})
export class CourseSectionItem {
    @Field({
        create: true,
        update: true,
        required: true,
        type: FieldType.radio,
        possibilities: [
            { id: CourseSectionItemType.pdf, text: CourseSectionItemType.pdf },
            { id: CourseSectionItemType.video, text: CourseSectionItemType.video },
            { id: CourseSectionItemType.test, text: CourseSectionItemType.test }
        ]
    })
    type: CourseSectionItemType;

    @Field({
        create: true,
        update: true,
        required: true,
        type: FieldType.pdf,
        enabled: new CoursesSectionsItemByTypeSpecification(CourseSectionItemType.pdf)
    })
    pdf: any;

    @Field({
        create: true,
        update: true,
        required: true,
        type: FieldType.video,
        enabled: new CoursesSectionsItemByTypeSpecification(CourseSectionItemType.video)
    })
    video: any;

    @Field({
        create: true,
        update: true,
        required: true,
        type: FieldType.object,
        classType: CourseTest,
        enabled: new CoursesSectionsItemByTypeSpecification(CourseSectionItemType.test)
    })
    test: CourseTest;

    constructor() {
        this.test = new CourseTest();
    }
}

@Model({
    titleKey: 'name'
})
export class CourseSection implements IEntity<string> {
    id: string;

    @Field({
        create: true,
        update: true,
        required: true
    })
    name: string;

    @Field({
        create: true,
        update: true,
        required: true,
        type: FieldType.array,
        classType: CourseSectionItem
    })
    items: Array<CourseSectionItem>

    constructor() {
        this.items = [];
    }
}

@Model({
    titleKey: 'info1'
})
export class TodoInfo {
    @Field({ details: true, create: true, update: true, required: true }) info1 = 'Test info 1';
    @Field({ details: true, create: true, update: true }) info2 = 'Test info 2';
}

@Model({
    titleKey: 'body',
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

    // @Field({
    //     create: modifyMetdata,
    //     update: modifyMetdata,
    //     details: true,
    //     list: { order: 1 },
    //     info: `
    //         <b>Test</b> new
    //     `
    // })
    // number: string;

    @Field({
        create: {
            ...modifyMetdata,
            required: false
        },
        update: {
            ...modifyMetdata,
            required: false,
            multi: true
        },
        type: FieldType.image,
        details: true,
        list: { order: 1 }
    })
    img: string;

    @Field({
        create: modifyMetdata,
        update: {
            ...modifyMetdata,
            multi: true
        },
        type: FieldType.longText,
        details: true,
        list: { order: 2 }
    })
    body: string;

    @Field({
        details: true,
        create: true,
        update: true,
        type: FieldType.array,
        classType: TodoInfo
    })
    infos: Array<TodoInfo>;

    @Field({
        create: true,
        update: true,
        type: FieldType.array,
        classType: CourseSection
    })
    sections: Array<CourseSection>;

    // @Field({
    //     create: modifyMetdata,
    //     update: modifyMetdata,
    //     details: true,
    //     confirm: true,
    //     possibilities: {
    //         strength: true
    //     },
    //     list: { order: 2 }
    // })
    // password: string;

    // @Field({
    //     create: modifyMetdata,
    //     update: modifyMetdata,
    //     details: true,
    //     list: { order: 2 },
    //     type: FieldType.check,
    //     possibilities: [
    //         {
    //             id: 1, text: 'Test 1'
    //         },
    //         {
    //             id: 2, text: 'Test 2'
    //         },
    //         {
    //             id: 3, text: 'Test 3'
    //         },
    //         {
    //             id: 4, text: 'Test 4'
    //         },
    //         {
    //             id: 5, text: 'Test 5'
    //         },
    //         {
    //             id: 6, text: 'Test 6'
    //         }
    //     ]
    // })
    // tags: Array<string>;

    // @Field({
    //     create: modifyMetdata,
    //     update: {
    //         ...modifyMetdata,
    //         multi: true
    //     },
    //     details: true,
    //     list: { order: 3, filter: true },
    //     type: FieldType.flag
    // })
    // done: boolean;

    // @Field({
    //     create: modifyMetdata,
    //     update: {
    //         ...modifyMetdata,
    //         multi: true
    //     },
    //     details: true,
    //     list: { order: 3, filter: true },
    //     type: FieldType.email
    // })
    // email: string;
    //
    // @Field({
    //     create: modifyMetdata,
    //     update: {
    //         ...modifyMetdata,
    //         multi: true
    //     },
    //     details: true,
    //     list: { order: 3, filter: true },
    //     type: FieldType.phoneNumber
    // })
    // numberPersonal: string;
    //
    // @Field({
    //     create: modifyMetdata,
    //     update: {
    //         ...modifyMetdata,
    //         multi: true
    //     },
    //     details: true,
    //     list: { order: 3, filter: true },
    //     type: FieldType.pesel
    // })
    // myPesel: string;

    // @Field({
    //     create: {
    //         required: true
    //     },
    //     update: {
    //         ...modifyMetdata,
    //         multi: true
    //     },
    //     details: true,
    //     type: FieldType.pdf
    // })
    // instruction: any;

    // @Field({
    //     create: {
    //         required: true
    //     },
    //     update: {
    //         ...modifyMetdata,
    //         multi: true
    //     },
    //     details: true,
    //     type: FieldType.video
    // })
    // media: any;

    // @Field({
    //     create: {
    //         required: true
    //     },
    //     update: {
    //         ...modifyMetdata,
    //         multi: true
    //     },
    //     details: true,
    //     type: FieldType.attachment
    // })
    // newFile: any;

    // @Field({
    //     create: {
    //         required: true
    //     },
    //     update: {
    //         ...modifyMetdata,
    //         multi: true
    //     },
    //     details: true,
    //     type: FieldType.dateRange
    // })
    // range: IDateRange;
}
