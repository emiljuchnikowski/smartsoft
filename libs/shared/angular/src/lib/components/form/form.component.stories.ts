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

@Model({})
class TestModel {
  @Field({
    required: true,
    type: FieldType.nip,
  })
  nip: string;

  @Field({
    required: true,
    type: FieldType.strings,
  })
  strings = ["test1", "test2"];

  @Field({
    required: true,
    type: FieldType.longText,
  })
  desc: string;

  @Field({
    required: true,
    type: FieldType.address,
  })
  address: IAddress = {
    city: 'Test city',
    street: 'Test street',
    zipCode: '00-000',
    flatNumber: '',
    buildingNumber: '1A'
  };

  // @Field({
  //   type: FieldType.address,
  // })
  // address2: string;
}

storiesOf("smart-form", module).add("inputs", () => ({
  moduleMetadata: {
    imports: [...IMPORTS, SharedFactoriesModule, TranslateModule.forRoot()],
    declarations: [...COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  component: FormComponent,
  props: {
    options: {
      model: new TestModel(),
    } as IFormOptions<any>,
  },
}));
