import * as md5 from 'md5';

// @dynamic
export class PasswordService {
    static hash(p: string): Promise<string> {
        return Promise.resolve(md5(p));

    }

    static compare(p: string, h: string): Promise<boolean> {
        return PasswordService.hash(p).then(hp => hp === h);
    }
}
