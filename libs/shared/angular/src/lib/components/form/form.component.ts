import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

import {IFormOptions} from "../../models";

@Component({
    selector: 'smart-form',
    template: `
        <smart-form-standard *ngIf="options" [options]="options"></smart-form-standard>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent<T> {
    @Input() options: IFormOptions<T>;
}
