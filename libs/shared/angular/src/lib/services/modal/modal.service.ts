import {Injectable} from "@angular/core";
import {ModalController} from "@ionic/angular";
import { ModalOptions } from '@ionic/core';

@Injectable()
export class ModalService {
    constructor(private modalCtrl: ModalController) { }

    async show(options: {
        component,
        props?,
        mode?: 'default' | 'bottom',
        cssClass?: string[],
        backdropDismiss?: boolean
    }): Promise<IModal> {
        const modalOptions = {
            component: options.component,
            componentProps: options.props,
            cssClass: options.cssClass ? options.cssClass : [],
            backdropDismiss: options.backdropDismiss
        } as ModalOptions<any>;

        if (options.mode === "bottom") {
            (modalOptions.cssClass as string[]).push('smart-modal-bottom');
        }

        const modal = await this.modalCtrl.create(modalOptions);
        await modal.present();

        return modal as any;
    }

    dismiss(): void {
        this.modalCtrl.dismiss();
    }
}

export interface IModal {
    dismiss: () => void;
    onDidDismiss(): Promise<{ data: any }>
}
