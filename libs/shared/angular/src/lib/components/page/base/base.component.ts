import { ElementRef, Input, OnDestroy, OnInit, Renderer2, Directive } from "@angular/core";
import { Location } from '@angular/common';
import {PopoverController} from "@ionic/angular";
import { Subscription} from "rxjs";

import {IIconButtonOptions, IPageOptions} from "../../../models/interfaces";
import {AppService} from "../../../services/app/app.service";

@Directive()
export abstract class PageBaseComponent implements OnInit, OnDestroy {
    private _options: IPageOptions;
    private _subscriptions = new Subscription();

    @Input() set options(val: IPageOptions) {
        this._options = val;
    }
    get options(): IPageOptions {
        return this._options;
    }

    protected constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private location: Location,
        private popover: PopoverController,
        public appService: AppService,
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

    ngOnDestroy(): void {
        if (this._subscriptions) {
            this._subscriptions.unsubscribe();
        }
    }
}
