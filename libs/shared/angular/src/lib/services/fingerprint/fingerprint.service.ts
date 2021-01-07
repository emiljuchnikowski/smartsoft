import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import {Platforms} from "@ionic/core";
import {TranslateService} from "@ngx-translate/core";

import {StorageService} from "../storage/storage.service";

export interface IFingerprintData {
    username: string;
    password: string;
}

export const FINGERPRINT_PLATFORMS: Platforms[] = [
    'android',
    'ios', 'ipad'
];

@Injectable()
export class FingerprintService {
    static set = false;

    isSet(): boolean {
        return FingerprintService.set || !!this.storageService.getItem('FINGERPINT_SET');
    }

    constructor(
        private readonly platform: Platform,
        private readonly faio: FingerprintAIO,
        private readonly translateService: TranslateService,
        private readonly storageService: StorageService
    ) { }

    async setData(data: IFingerprintData): Promise<void> {
        if (!this.isSet() && FINGERPRINT_PLATFORMS.some(p => this.platform.is(p)) && await this.faio.isAvailable()) {
            await this.faio.registerBiometricSecret({
                secret: JSON.stringify(data)
            });

            this.storageService.setItem('FINGERPINT_SET', "1");
            FingerprintService.set = true;

            return;
        }

        // // to tests
        // localStorage.setItem('TEST_FINGERPINT', JSON.stringify(data));
        // localStorage.setItem('FINGERPINT_SET', "1");
    }

    async clearData(): Promise<void> {
        this.storageService.removeItem('FINGERPINT_SET');
        FingerprintService.set = false;
    }

    async getDate(options: {
        force?: boolean
    } = {}): Promise<IFingerprintData> {
        if (!options.force && !this.isSet()) return null;

        FingerprintService.set = true;

        const data = await this.faio.loadBiometricSecret({
            title: this.translateService.instant('APP.signIn'),
            cancelButtonTitle: this.translateService.instant('cancel')
        });

        // // to tests
        // const data = localStorage.getItem('TEST_FINGERPINT');

        return JSON.parse(data);
    }
}