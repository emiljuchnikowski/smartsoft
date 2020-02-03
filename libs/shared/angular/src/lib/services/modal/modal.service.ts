import {Injectable} from "@angular/core";
import {ModalController} from "@ionic/angular";

import {modalFromBottomEnterAnimation, modalFromBottomLeaveAnimation} from "../../shared.animations";

@Injectable()
export class ModalService {
    constructor(private modalCtrl: ModalController) { }

    async show(options: { component, props?, mode?: 'default' | 'bottom' }): Promise<IModal> {
        const modalOptions = {
            component: options.component,
            componentProps: options.props
        } as any;

        if (options.mode === "bottom") {
            modalOptions.cssClass =  [
                'smart-modal-bottom'
            ];
            modalOptions.enterAnimation = modalFromBottomEnterAnimation;
            modalOptions.leaveAnimation = modalFromBottomLeaveAnimation;
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
