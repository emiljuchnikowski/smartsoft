export class SpecificationService {
    /**
     * Checking if the value meets the specifications
     * @param value {object} - object to check
     * @param spec {ISpecificatio} - specification
     */
    static valid<T>(value: T, spec: { criteria: any }): boolean {
        const keys = Object.keys(spec.criteria);

        if (!value) return false;

        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (spec.criteria[key] !== value[key]) return false;
        }

        return true;
    }

    /**
     * Checking if the object does not meet the specifications
     * @param value {object} - object to check
     * @param spec {ISpecificatio} - specification
     */
    static invalid<T>(value: T, spec: { criteria: any }): boolean {
        return !SpecificationService.valid(value, spec);
    }

    /**
     * Convert specification to sql
     * @param spec {ISpecificatio} - specification
     * @return - sql criteria
     */
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