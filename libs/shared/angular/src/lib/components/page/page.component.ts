import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

import {IPageOptions} from "../../models";

@Component({
    selector: 'smart-page',
    template: `
        <smart-page-standard [options]="options">
            <ng-content></ng-content>
        </smart-page-standard>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
    @Input() options: IPageOptions;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }
}
