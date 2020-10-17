export class ZipCodeService {
    static isValid(code: string): boolean {
        return !!code.match(/^\d\d-\d\d\d$/);
    }

    static isInvalid(code: string): boolean {
        return !this.isValid(code);
    }
}
