import {Injectable} from "@angular/core";
import {CameraResultType, Plugins} from '@capacitor/core';

const { Camera } = Plugins;

@Injectable()
export class CameraService {
    async getCapture(options: {
        quality?: number
    } = {}): Promise<{ data, exif }> {
        const image = await Camera.getPhoto({
            quality: options.quality ? options.quality : 100,
            resultType: CameraResultType.Base64
        });

        return {
            data: image.base64String,
            exif: image.exif
        }
    }
}