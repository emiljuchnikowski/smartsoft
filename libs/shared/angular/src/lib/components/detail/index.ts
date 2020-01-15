import {DetailComponent} from "./detail.component";
import {DetailTextComponent} from "./text/text.component";
import {DetailFlagComponent} from "./flag/flag.component";
import {DetailEnumComponent} from "./enum/enum.component";
import {DetailEmailComponent} from "./email/email.component";

export * from './detail.component';

export const DETAIL_COMPONENTS = [
  DetailComponent,
  DetailTextComponent,
  DetailFlagComponent,
  DetailEnumComponent,
  DetailEmailComponent
];
