import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { ColorPickerModule } from "ngx-color-picker";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxEditorModule} from "ngx-editor";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {MatStepperModule} from '@angular/material/stepper';


import { AccordionBodyComponent } from "./accordion/body/body.component";
import { AccordionComponent } from "./accordion/accordion.component";
import { AccordionHeaderComponent } from "./accordion/header/header.component";
import { AppSplitPanelComponent } from "./app/split-panel/split-panel.component";
import { ButtonComponent } from "./button/button.component";
import { CardComponent } from "./card/card.component";
import { ChartBarComponent } from "./chart/bar/bar.component";
import { ChartComponent } from "./chart/chart.component";
import { ChartLineComponent } from "./chart/line/line.component";
import { DetailComponent } from "./detail/detail.component";
import { DetailEmailComponent } from "./detail/email/email.component";
import { DetailEnumComponent } from "./detail/enum/enum.component";
import { DetailFlagComponent } from "./detail/flag/flag.component";
import { DetailTextComponent } from "./detail/text/text.component";
import { DetailsComponent } from "./details/details.component";
import { DetailsStandardComponent } from "./details/standard/standard.component";
import { FormComponent } from "./form/form.component";
import { FormStandardComponent } from "./form/standard/standard.component";
import { GridColumnComponent } from "./grid/column/column.component";
import { GridComponent } from "./grid/grid.component";
import { GridRowComponent } from "./grid/row/row.component";
import { InputComponent } from "./input/input.component";
import { InputCurrencyComponent } from "./input/currency/currency.component";
import { InputDateComponent } from "./input/date/date.component";
import { InputDateWithEditComponent } from "./input/date-with-edit/date-with-edit.component";
import { InputEmailComponent } from "./input/email/email.component";
import { InputEnumComponent } from "./input/enum/enum.component";
import { InputErrorComponent } from "./input/error/error.component";
import { InputFileComponent } from "./input/file/file.component";
import { InputFlagComponent } from "./input/flag/flag.component";
import { InputIntComponent } from "./input/int/int.component";
import { InputNipComponent } from "./input/nip/nip.component";
import { InputPasswordComponent } from "./input/password/password.component";
import { InputRadioComponent } from "./input/radio/radio.component";
import { InputTextComponent } from "./input/text/text.component";
import { ListComponent } from "./list/list.component";
import { ListDesktopComponent } from "./list/desktop/desktop.component";
import { ListMobileComponent } from "./list/mobile/mobile.component";
import { LoaderComponent } from "./loader/loader.component";
import { PageComponent } from "./page/page.component";
import { PageStandardComponent } from "./page/standard/standard.component";
import { SearchbarComponent } from "./searchbar/searchbar.component";
import { SharedDirectivesModule } from "../directives/directives.module";
import { SharedPipesModule } from "../pipes/pipes.module";
import { TabComponent } from "./tabs/tab/tab.component";
import { TabsComponent } from "./tabs/tabs.component";
import { InputStringsComponent } from "./input/strings/strings.component";
import { InputLongTextComponent } from "./input/long-text/long-text.component";
import { InputAddressComponent } from "./input/address/address.component";
import { DetailAddressComponent } from "./detail/address/address.component";
import { InputObjectComponent } from "./input/object/object.component";
import { DetailObjectComponent } from "./detail/object/object.component";
import { InputColorComponent } from "./input/color/color.component";
import { DetailColorComponent } from "./detail/color/color.component";
import { InputLogoComponent } from "./input/logo/logo.component";
import { DetailLogoComponent } from "./detail/logo/logo.component";
import { InputCheckComponent } from "./input/check/check.component";
import { DynamicComponent } from "./dynamic/dynamic.component";
import { InputIntsComponent } from "./input/ints/ints.component";
import { PasswordStrengthComponent } from "./password-strength/password-strength.component";
import { InfoComponent, InfoModalComponent } from "./info/info.component";
import {InputPhoneNumberComponent} from "./input/phone-number/phone-number.component";
import {InputPeselComponent} from "./input/pesel/pesel.component";
import {ErrorContextComponent} from "./error-context/error-context.component";
import {InputArrayComponent} from "./input/array/array.component";
import {DetailArrayComponent} from "./detail/array/array.component";
import {InputPdfComponent} from "./input/pdf/pdf.component";
import {DetailPdfComponent} from "./detail/pdf/pdf.component";
import {InputVideoComponent} from "./input/video/video.component";
import {DetailVideoComponent} from "./detail/video/video.component";
import {InputAttachmentComponent} from "./input/attachment/attachment.component";
import {DetailAttachmentComponent} from "./detail/attachment/attachment.component";
import {InputDateRangeComponent} from "./input/date-range/date-range.component";
import {DateRangeComponent, DateRangeModalComponent} from "./date-range/date-range.component";
import {DetailDateRangeComponent} from "./detail/date-range/date-range.component";
import {InputImageComponent} from "./input/image/image.component";
import {DetailImageComponent} from "./detail/image/image.component";
import {InputFloatComponent} from "./input/float/float.component";
import {ListMasonryGridComponent} from "./list/masonry-grid/masonry-grid.component";
import {FormStepperComponent} from "./form/stepper/stepper.component";
import {MatButtonModule} from "@angular/material/button";

export const APP_COMPONENTS = [AppSplitPanelComponent];

export const ACCORDION_COMPONENTS = [
  AccordionComponent,
  AccordionHeaderComponent,
  AccordionBodyComponent,
];

export const BUTTON_COMPONENTS = [ButtonComponent];

export const CARD_COMPONENTS = [CardComponent];

export const CHART_COMPONENTS = [
  ChartComponent,
  ChartLineComponent,
  ChartBarComponent,
];

export const DETAILS_COMPONENTS = [DetailsComponent, DetailsStandardComponent];

export const DETAIL_COMPONENTS = [
  DetailComponent,
  DetailTextComponent,
  DetailFlagComponent,
  DetailEnumComponent,
  DetailEmailComponent,
  DetailAddressComponent,
  DetailObjectComponent,
  DetailColorComponent,
  DetailLogoComponent,
  DetailArrayComponent,
  DetailPdfComponent,
  DetailVideoComponent,
  DetailAttachmentComponent,
  DetailDateRangeComponent,
  DetailImageComponent
];

export const FORM_COMPONENTS = [FormStandardComponent, FormStepperComponent, FormComponent];

export const INPUT_COMPONENTS = [
  InputComponent,
  InputIntComponent,
  InputErrorComponent,
  InputTextComponent,
  InputPasswordComponent,
  InputFlagComponent,
  InputEnumComponent,
  InputEmailComponent,
  InputCurrencyComponent,
  InputDateComponent,
  InputDateWithEditComponent,
  InputFileComponent,
  InputRadioComponent,
  InputNipComponent,
  InputStringsComponent,
  InputLongTextComponent,
  InputAddressComponent,
  InputObjectComponent,
  InputColorComponent,
  InputLogoComponent,
  InputCheckComponent,
  InputIntsComponent,
  InputPhoneNumberComponent,
  InputPeselComponent,
  InputArrayComponent,
  InputPdfComponent,
  InputVideoComponent,
  InputAttachmentComponent,
  InputDateRangeComponent,
  InputImageComponent,
  InputFloatComponent
];

export const LIST_COMPONENTS = [
  ListComponent,
  ListMobileComponent,
  ListDesktopComponent,
  ListMasonryGridComponent
];

export const LOADER_COMPONENTS = [LoaderComponent];

export const PAGE_COMPONENTS = [PageStandardComponent, PageComponent];

export const SEARCHBAR_COMPONENTS = [SearchbarComponent];

export const TABS_COMPONENTS = [TabsComponent, TabComponent];

export const GRID_COMPONENTS = [
  GridComponent,
  GridRowComponent,
  GridColumnComponent,
];

export const INFO_COMPONENTS = [InfoComponent, InfoModalComponent];
export const DATE_RANGE_COMPONENTS = [DateRangeComponent, DateRangeModalComponent];

export const DYNAMIC_COMPONENTS = [DynamicComponent];

export const COMPONENTS = [
  ...FORM_COMPONENTS,
  ...APP_COMPONENTS,
  ...PAGE_COMPONENTS,
  ...INPUT_COMPONENTS,
  ...BUTTON_COMPONENTS,
  ...CARD_COMPONENTS,
  ...LIST_COMPONENTS,
  ...LOADER_COMPONENTS,
  ...DETAIL_COMPONENTS,
  ...DETAILS_COMPONENTS,
  ...SEARCHBAR_COMPONENTS,
  ...TABS_COMPONENTS,
  ...ACCORDION_COMPONENTS,
  ...CHART_COMPONENTS,
  ...GRID_COMPONENTS,
  ...DYNAMIC_COMPONENTS,
  PasswordStrengthComponent,
  ...INFO_COMPONENTS,
    ...DATE_RANGE_COMPONENTS,
    ErrorContextComponent
];

export const IMPORTS = [
  CommonModule,
  IonicModule,
  ReactiveFormsModule,
  FormsModule,
  TranslateModule,
  RouterModule,
  SharedPipesModule,
  SharedDirectivesModule,
  HttpClientModule,
  MatTableModule,
  MatSortModule,
  ChartsModule,
  ColorPickerModule,
  NgxEditorModule,
  LazyLoadImageModule,
  DragDropModule,
  MatStepperModule,
  MatButtonModule
];

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
      ...IMPORTS
  ]
})
export class SharedComponentsModule {}
