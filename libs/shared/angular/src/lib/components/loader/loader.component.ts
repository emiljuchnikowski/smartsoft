import { Component, Input } from '@angular/core';

@Component({
    selector: 'smart-loader',
    template: '<ion-spinner *ngIf="show"></ion-spinner>',
    styleUrls: [
        './loader.component.scss'
    ]
})
export class LoaderComponent {
    @Input() show: boolean;
}