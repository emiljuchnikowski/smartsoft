export class ZipCodeService {
    static isValid(code: string): boolean {
        const re = new RegExp('^\\d\\d-\\d\\d\\d$');
        return !!code.match(re);
    }

    static isInvalid(code: string): boolean {
        return !ZipCodeService.isValid(code);
    }
}
