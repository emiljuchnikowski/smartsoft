import * as md5 from 'md5';

export class PasswordService {
    static hash(p: string): Promise<string> {
        return Promise.resolve(md5(p));

    }

    static compare(p: string, h: string): Promise<boolean> {
        return this.hash(p).then(hp => hp === h);
    }
}
