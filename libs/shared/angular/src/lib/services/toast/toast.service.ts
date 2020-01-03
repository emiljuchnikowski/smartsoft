import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async error(config: { title?: string, message: string }): Promise<void> {
    const toast = await this.toastCtrl.create({
      position: 'bottom',
      header: config.title,
      message: config.message,
      duration: 2000
    });

    await toast.present();
  }
}
