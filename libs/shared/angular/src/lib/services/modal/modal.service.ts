import {Injectable} from "@angular/core";
import {ModalController} from "@ionic/angular";

@Injectable()
export class ModalService {
    constructor(private modalCtrl: ModalController) { }

    async show(options: { component, props?, mode?: 'default' | 'bottom', cssClass?: string }): Promise<IModal> {
        const modalOptions = {
            component: options.component,
            componentProps: options.props,
            cssClass: options.cssClass
        } as any;

        if (options.mode === "bottom") {
            modalOptions.cssClass =  [
                'smart-modal-bottom'
            ];
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
