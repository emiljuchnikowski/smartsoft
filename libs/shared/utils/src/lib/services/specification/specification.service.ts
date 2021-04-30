export class SpecificationService {
    static valid<T>(value: T, spec: { criteria: any }): boolean {
        const keys = Object.keys(spec.criteria);

        if (!value) return false;

        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (spec.criteria[key] !== value[key]) return false;
        }

        return true;
    }

    static invalid<T>(value: T, spec: { criteria: any }): boolean {
        return !SpecificationService.valid(value, spec);
    }

    static getSqlCriteria(spec: { criteria: any }): string {
        const keys = Object.keys(spec.criteria);
        let result = '';

        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const val = spec.criteria[key];

            if (index) result += ' and ';

            result += `${ key } = ${ (typeof val === 'number') ? val : "'" + val + "'" }`;
        }

        return result;
    }
}