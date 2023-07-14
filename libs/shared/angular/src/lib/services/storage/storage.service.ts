import {Inject, Injectable, Injector, PLATFORM_ID} from '@angular/core';
import { CookieService } from 'ngx-cookie';
import {Platform} from "@ionic/angular";
import { isPlatformBrowser } from '@angular/common';
import { Storage as IonicStorage } from '@ionic/storage';

@Injectable()
export class StorageService implements Storage {
    static data = {};

    [index: number]: string;
    [key: string]: any;
    length: number;
    cookies: any;

    constructor(
        private cookieService: CookieService,
        private platform: Platform,
        private injector: Injector,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    public async init(): Promise<void> {
        if (isPlatformBrowser(this.platformId) && this.platform.is('capacitor')) {
            await this.platform.ready();

            const keys = await this.injector.get(IonicStorage).keys();

            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];

                StorageService.data[key] = await this.injector.get(IonicStorage).get(key);
            }
        } else {
            StorageService.data = this.cookieService.getAll();
        }
    }

    public clear(): void {
        if (isPlatformBrowser(this.platformId) && this.platform.is('capacitor')) {
            this.injector.get(IonicStorage).clear();
        } else {
            this.cookieService.removeAll();
        }

        StorageService.data = {};
    }

    public getAll(): Object {
        return StorageService.data;
    }

    public getItem(key: string): string {
        return StorageService.data[key];
    }

    public key(index: number): string {
        return this.cookieService.getAll().propertyIsEnumerable[index];
    }

    public removeItem(key: string): void {
        if (isPlatformBrowser(this.platformId) && this.platform.is('capacitor')) {
            this.injector.get(IonicStorage).remove(key);
        } else {
            this.cookieService.remove(key);
        }

        delete StorageService.data[key];
    }

    public setItem(key: string, data: string): void {
        if (isPlatformBrowser(this.platformId) && this.platform.is('capacitor')) {
            this.injector.get(IonicStorage).set(key, data);
        } else {
            this.cookieService.put(key, data);
        }

        StorageService.data[key] = data;
    }
}
