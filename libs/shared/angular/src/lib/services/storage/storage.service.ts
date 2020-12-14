import {Injectable, Injector} from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';
import {Platform} from "@ionic/angular";
import { Storage as IonicStorage } from '@ionic/storage';

@Injectable()
export class StorageService implements Storage {
    [index: number]: string;
    [key: string]: any;
    length: number;
    cookies: any;

    private _storage = {};

    constructor(private cookieService: CookieService, private platform: Platform,  private injector: Injector) {

    }

    public async init(): Promise<void> {
        if (this.platform.is('mobile')) {
            const keys = await this.injector.get(IonicStorage).keys();

            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];

                this._storage[key] = await this.injector.get(IonicStorage).get(key);
            }
        }

        this._storage = this.cookieService.getAll();
    }

    public clear(): void {
        if (this.platform.is('mobile')) {
            this.injector.get(IonicStorage).clear();
        } else {
            this.cookieService.removeAll();
        }

        this._storage = {};
    }

    public getAll(): Object {
        return this._storage;
    }

    public getItem(key: string): string {
        return this._storage[key];
    }

    public key(index: number): string {
        return this.cookieService.getAll().propertyIsEnumerable[index];
    }

    public removeItem(key: string): void {
        delete this._storage['key'];

        if (this.platform.is('mobile')) {
            this.injector.get(IonicStorage).remove(key);
        } else {
            this.cookieService.remove(key);
        }

        delete this._storage['key'];
    }

    public setItem(key: string, data: string): void {
        if (this.platform.is('mobile')) {
            this.injector.get(IonicStorage).set(key, data);
        } else {
            this.cookieService.put(key, data);
        }

        this._storage['key'] = data;
    }
}
