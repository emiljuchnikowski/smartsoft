import {Component} from "@angular/core";
import {ListBaseComponent, PageBaseComponent} from "@smartsoft001/angular";

// @Component({
//     template: `
//         TEST PAGE START<br/><br/>
//
//         <ng-container *ngIf="options">
//             <smart-list-desktop [options]="options"></smart-list-desktop>
//
//             <ion-row>
//                 <ion-col></ion-col>
//                 <ion-col size="auto">
//                     <smart-loader [show]="options?.provider?.loading$ | async"></smart-loader>
//                     <h2 *ngIf="!(options?.provider?.loading$ | async) && !(options.provider.list$ | async)?.length">
//                         <br/>
//                         {{ 'noResults' | translate }}
//                     </h2>
//                 </ion-col>
//                 <ion-col></ion-col>
//             </ion-row>
//         </ng-container>
//
//         TEST PAGE END<br/><br/>
//     `
// })
export class CustomListComponent extends ListBaseComponent<any>  {

}