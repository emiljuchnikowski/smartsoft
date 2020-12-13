import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import {Platforms} from "@ionic/core";
import {TranslateService} from "@ngx-translate/core";

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
    isSet(): boolean {
        return !!localStorage.getItem('FINGERPINT_SET');
    }

    constructor(
        private readonly platform: Platform,
        private readonly faio: FingerprintAIO,
        private readonly translateService: TranslateService
    ) { }

    async setData(data: IFingerprintData): Promise<void> {
        if (FINGERPRINT_PLATFORMS.some(p => this.platform.is(p)) && await this.faio.isAvailable()) {
            await this.faio.registerBiometricSecret({
                secret: JSON.stringify(data)
            });

            localStorage.setItem('FINGERPINT_SET', "1");

            return;
        }

        // // to tests
        // localStorage.setItem('TEST_FINGERPINT', JSON.stringify(data));
        // localStorage.setItem('FINGERPINT_SET', "1");
    }

    async getDate(): Promise<IFingerprintData> {
        if (!this.isSet()) return null;

        const data = await this.faio.loadBiometricSecret({
            title: this.translateService.instant('APP.signIn')
        });

        // // to tests
        // const data = localStorage.getItem('TEST_FINGERPINT');

        return JSON.parse(data);
    }
}