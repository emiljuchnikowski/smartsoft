import {ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import { Location } from '@angular/common';
import {PopoverController} from "@ionic/angular";

import {IIconButtonOptions, IPageOptions} from "../../../models/interfaces";

export abstract class PageBaseComponent implements OnInit {
    @Input() options: IPageOptions;

    protected constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private location: Location,
        private popover: PopoverController
    ) { }

    back(): void {
        this.location.back();
        console.log( 'goBack()...' );
    }

    async presentPopover(ev: any, btn: IIconButtonOptions): Promise<void> {
        const instance = await this.popover.create({
            event: ev,
            component: btn.component,
            translucent: true
        });

        await instance.present();
    }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }
}
