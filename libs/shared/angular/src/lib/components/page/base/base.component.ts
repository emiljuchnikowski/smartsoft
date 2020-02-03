import {ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import { Location } from '@angular/common';

import {IPageOptions} from "../../../models/interfaces";

export abstract class PageBaseComponent implements OnInit {
    @Input() options: IPageOptions;

    protected constructor(private el: ElementRef, private renderer: Renderer2, private location: Location) {

    }

    back(): void {
        this.location.back();
        console.log( 'goBack()...' );
    }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }
}
