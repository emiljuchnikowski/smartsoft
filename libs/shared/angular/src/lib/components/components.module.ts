import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";

import { DetailTextComponent } from "./detail/text/text.component";
import { DetailFlagComponent } from "./detail/flag/flag.component";
import { DetailEnumComponent } from "./detail/enum/enum.component";
import { DetailEmailComponent } from "./detail/email/email.component";
import { InputErrorComponent } from "./input/error/error.component";
import { InputTextComponent } from "./input/text/text.component";
import { InputPasswordComponent } from "./input/password/password.component";
import { InputFlagComponent } from "./input/flag/flag.component";
import { InputEnumComponent } from "./input/enum/enum.component";
import { InputEmailComponent } from "./input/email/email.component";
import { InputCurrencyComponent } from "./input/currency/currency.component";
import { InputIntComponent } from "./input/int/int.component";
import { InputDateComponent } from "./input/date/date.component";
import { AppSplitPanelComponent } from "./app/split-panel/split-panel.component";
import { ButtonComponent } from "./button/button.component";
import { CardComponent } from "./card/card.component";
import { DetailComponent } from "./detail/detail.component";
import { FormStandardComponent } from "./form/standard/standard.component";
import { FormComponent } from "./form/form.component";
import { InputComponent } from "./input/input.component";
import { ListComponent } from "./list/list.component";
import { ListMobileComponent } from "./list/mobile/mobile.component";
import { ListDesktopComponent } from "./list/desktop/desktop.component";
import { LoaderComponent } from "./loader/loader.component";
import { PageStandardComponent } from "./page/standard/standard.component";
import { PageComponent } from "./page/page.component";
import { SharedPipesModule } from "../pipes/pipes.module";
import { SharedDirectivesModule } from "../directives/directives.module";
import { DetailsComponent } from "./details/details.component";
import { DetailsStandardComponent } from "./details/standard/standard.component";
import { InputFileComponent } from "./input/file/file.component";
import { InputRadioComponent } from "./input/radio/radio.component";
import { SearchbarComponent } from "./searchbar/searchbar.component";
import { TabsComponent } from "./tabs/tabs.component";
import { TabComponent } from "./tabs/tab/tab.component";
import { AccordionComponent } from "./accordion/accordion.component";
import { AccordionHeaderComponent } from "./accordion/header/header.component";
import { AccordionBodyComponent } from "./accordion/body/body.component";
import { InputDateWithEditComponent } from "./input/date-with-edit/date-with-edit.component";
import { ChartComponent } from "./chart/chart.component";
import {ChartLineComponent} from "./chart/line/line.component";
import {ChartBarComponent} from "./chart/bar/bar.component";
import {GridComponent} from "./grid/grid.component";
import {GridRowComponent} from "./grid/row/row.component";
import {GridColumnComponent} from "./grid/column/column.component";

export const APP_COMPONENTS = [AppSplitPanelComponent];

export const ACCORDION_COMPONENTS = [
  AccordionComponent,
  AccordionHeaderComponent,
  AccordionBodyComponent
];

export const BUTTON_COMPONENTS = [ButtonComponent];

export const CARD_COMPONENTS = [CardComponent];

export const CHART_COMPONENTS = [
    ChartComponent,
    ChartLineComponent,
    ChartBarComponent
];

export const DETAILS_COMPONENTS = [DetailsComponent, DetailsStandardComponent];

export const DETAIL_COMPONENTS = [
  DetailComponent,
  DetailTextComponent,
  DetailFlagComponent,
  DetailEnumComponent,
  DetailEmailComponent
];

export const FORM_COMPONENTS = [FormStandardComponent, FormComponent];

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
  InputRadioComponent
];

export const LIST_COMPONENTS = [
  ListComponent,
  ListMobileComponent,
  ListDesktopComponent
];

export const LOADER_COMPONENTS = [LoaderComponent];

export const PAGE_COMPONENTS = [PageStandardComponent, PageComponent];

export const SEARCHBAR_COMPONENTS = [SearchbarComponent];

export const TABS_COMPONENTS = [TabsComponent, TabComponent];

export const GRID_COMPONENTS = [ GridComponent, GridRowComponent, GridColumnComponent ];

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
  ...GRID_COMPONENTS
];

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    SharedPipesModule,
    SharedDirectivesModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    ChartsModule
  ]
})
export class SharedComponentsModule {}
