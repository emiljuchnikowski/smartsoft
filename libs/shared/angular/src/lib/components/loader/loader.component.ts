import { Component, Input } from '@angular/core';

@Component({
    selector: 'smart-loader',
    template: '<ion-spinner *ngIf="show" [style.height]="height"></ion-spinner>',
    styleUrls: [
        './loader.component.scss'
    ]
})
export class LoaderComponent {
    @Input() show: boolean;
    @Input() height: string;
}
