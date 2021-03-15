import {ElementRef, Injectable} from "@angular/core";
import { StyleService as SmartStyleService } from "@smartsoft001/angular";

import { variables } from "./variables";

@Injectable()
export class StyleService {
    constructor(
        private styleService: SmartStyleService
    ) {}

    init(elementRef: ElementRef): void {
        const customVariables = {
            ...variables,
            //..
        };

        this.styleService.init(elementRef, customVariables);
    }
}