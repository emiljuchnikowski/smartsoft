import {ElementRef, Input, OnInit, Renderer2} from "@angular/core";

import {IPageOptions} from "../../../models";

export abstract class PageBaseComponent implements OnInit {
    @Input() options: IPageOptions;

    protected constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }
}
