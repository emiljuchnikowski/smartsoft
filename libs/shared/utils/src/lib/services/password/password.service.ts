import * as bcrypt from 'bcrypt';

export class PasswordService {
    static hash(p: string): Promise<string> {
        return new Promise<string>((res, rej) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    rej(err);
                    return;
                }

                bcrypt.hash(p, salt, (err2, hash) => {
                    if (err2) {
                        rej(err2);
                        return;
                    }

                    res(hash);
                });
            })
        });

    }

    static compare(p: string, h: string): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            bcrypt.compare(p, h, (err, isMatch) => {
                if (err) {
                    rej(err);
                    return;
                }

                res(isMatch);
            });
        });
    }
}
