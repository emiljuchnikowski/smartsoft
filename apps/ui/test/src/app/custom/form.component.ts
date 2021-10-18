import {Component} from "@angular/core";

import {FormBaseComponent} from "@smartsoft001/angular";

// @Component({
//     template: `
//         <ion-list class="smart-list">
//             <ng-container *ngFor="let field of fields">
//                 <smart-input *ngIf="form.controls[field] && !form.controls[field]['__smartDisabled']" [options]="{
//             treeLevel: treeLevel,
//             fieldKey: field,
//             control: form.controls[field],
//             model: model,
//             mode: mode,
//             possibilities$: possibilities[field],
//             component: inputComponents[field]
//         }"></smart-input>
//             </ng-container>
//         </ion-list>
//     `
// })
export class CustomFormComponent<T> extends FormBaseComponent<T> {

}