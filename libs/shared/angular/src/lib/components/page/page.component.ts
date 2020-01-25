import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer2,
} from "@angular/core";

import {IPageOptions} from "../../models/interfaces";

@Component({
    selector: 'smart-page',
    template: `
        <smart-page-standard [options]="options">
            <ng-content></ng-content>
        </smart-page-standard>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit, AfterViewInit {
    private _options: IPageOptions;

    @Input() set options(val: IPageOptions) {
        this._options = val;
    }
    get options(): IPageOptions {
        return this._options;
    }

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }

    ngAfterViewInit(): void {

    }

}
