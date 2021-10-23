import {Component} from "@angular/core";
import {DetailsBaseComponent, PageBaseComponent} from "@smartsoft001/angular";
import {CrudItemPageBaseComponent} from "@smartsoft001/crud-shell-angular";

// @Component({
//     template: `
//         test
//         <ng-container *ngIf="mode === 'details'; else editTpl">
//             <smart-details *ngIf="detailsOptions" [options]='detailsOptions'></smart-details>
//
//             test
//         </ng-container>
//
//         <ng-template #editTpl>
//             <smart-form
//                     [options]="
//           (selected$ | async)
//           | smartFormOptions : mode:config?.type:uniqueProvider : config.inputComponents
//         "
//                     (valuePartialChange)="onPartialChange($event)"
//                     (valueChange)="onChange($event)"
//                     (validChange)="onValidChange($event)"
//             ></smart-form>
//         </ng-template>
//
//         <br/><br/>
//     `
// })
export class CustomCrudItemComponent extends CrudItemPageBaseComponent<any>  {

}