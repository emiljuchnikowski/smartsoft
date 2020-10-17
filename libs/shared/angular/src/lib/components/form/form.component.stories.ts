import { storiesOf } from "@storybook/angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import {IAddress} from "@smartsoft001/domain-core";

import {
  COMPONENTS,
  FormComponent,
  IFormOptions,
  IMPORTS,
  SharedFactoriesModule,
} from "@smartsoft001/angular";
import { Field, FieldType, Model } from "@smartsoft001/models";
import {TranslateModule} from "@ngx-translate/core";

const moduleMetadate = {
  imports: [...IMPORTS, SharedFactoriesModule, TranslateModule.forRoot()],
  declarations: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
}

storiesOf("smart-form/inputs", module)
    .add("address", () => ({
      moduleMetadata: moduleMetadate,
      component: FormComponent,
      props: {
        options: {
          model: (() => {
            @Model({})
            class TestModel {
              @Field({
                required: true,
                type: FieldType.address,
              })
              address: IAddress
            }

            return new TestModel();
          })(),
        } as IFormOptions<any>,
      },
    }))
    .add("nip", () => ({
      moduleMetadata: moduleMetadate,
      component: FormComponent,
      props: {
        options: {
          model: (() => {
            @Model({})
            class TestModel {
              @Field({
                required: true,
                type: FieldType.nip,
              })
              nip: string;
            }

            return new TestModel();
          })(),
        } as IFormOptions<any>,
      },
    }))
    .add("strings", () => ({
      moduleMetadata: moduleMetadate,
      component: FormComponent,
      props: {
        options: {
          model: (() => {
            @Model({})
            class TestModel {
              @Field({
                required: true,
                type: FieldType.strings,
              })
              strings = ["test1", "test2"];
            }

            return new TestModel();
          })(),
        } as IFormOptions<any>,
      },
    }))
    .add("desc", () => ({
      moduleMetadata: moduleMetadate,
      component: FormComponent,
      props: {
        options: {
          model: (() => {
            @Model({})
            class TestModel {
              @Field({
                required: true,
                type: FieldType.longText,
              })
              desc: string;
            }

            return new TestModel();
          })(),
        } as IFormOptions<any>,
      },
    }))
    .add("longText", () => ({
      moduleMetadata: moduleMetadate,
      component: FormComponent,
      props: {
        options: {
          model: (() => {
            @Model({})
            class TestModel {
              @Field({
                required: true,
                type: FieldType.longText,
              })
              desc: string;
            }

            return new TestModel();
          })(),
        } as IFormOptions<any>,
      },
    }))
    .add("object", () => ({
      moduleMetadata: moduleMetadate,
      component: FormComponent,
      props: {
        options: {
          model: (() => {
            @Model({})
            class TestUserModel {
              @Field({ })
              firstName: string;

              @Field({
                required: true
              })
              lastName: string
            }

            @Model({})
            class TestModel {
              @Field({ })
              test: string;

              @Field({
                required: true,
                type: FieldType.object,
              })
              user = new TestUserModel();
            }

            return new TestModel();
          })(),
        } as IFormOptions<any>,
      },
    }));
