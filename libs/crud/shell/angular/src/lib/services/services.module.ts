import {NgModule} from "@angular/core";
import { CrudService } from './crud/crud.service';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

const SERVICES = [
    CrudService
];

@NgModule({
    providers: [
        ...SERVICES
    ],
    imports: [
        HttpClientModule,
        CommonModule
    ]
})
export class CrudServicesModule {

}
