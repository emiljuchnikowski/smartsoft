import {Field, FieldType, Model} from "@smartsoft001/models";
import {IEntity} from "@smartsoft001/domain-core";

@Model({})
export class ConfigSmtp {
    @Field({
        required: true,
        create: true,
        update: true,
        details: true
    })
    host: string;

    @Field({
        required: true,
        create: true,
        update: true,
        details: true,
        type: FieldType.int
    })
    port: number;

    @Field({
        required: true,
        create: true,
        update: true,
        details: true
    })
    user: string;

    @Field({
        required: true,
        create: true,
        update: true,
        details: true,
        type: FieldType.password
    })
    pass: string;
}

@Model({})
export class ConfigMailTemplate {
    @Field({
        required: true,
        create: true,
        update: true,
        details: true
    })
    title: string;

    @Field({
        required: true,
        create: true,
        update: true,
        details: true,
        type: FieldType.longText
    })
    body: string;
}

@Model({})
export class Config implements IEntity<string> {
    id: string;

    @Field({
        required: true,
        create: true,
        update: true,
        details: true,
        type: FieldType.object,
        classType: ConfigSmtp
    })
    smtp: ConfigSmtp;

    @Field({
        required: true,
        create: true,
        update: true,
        details: true,
        type: FieldType.object,
        classType: ConfigMailTemplate
    })
    remindPasswordMail: ConfigMailTemplate;

    @Field({
        required: true,
        create: true,
        update: true,
        details: true,
        type: FieldType.object,
        classType: ConfigMailTemplate
    })
    registerMail: ConfigMailTemplate;

    constructor() {
        this.smtp = new ConfigSmtp();
        this.remindPasswordMail = new ConfigMailTemplate();
        this.registerMail = new ConfigMailTemplate();
    }
}