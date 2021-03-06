export interface IEntity<T> {
    id: T;
}

export interface IAddress {
    city: string;
    street: string;
    buildingNumber: string;
    flatNumber?: string;
    zipCode: string;
}

export interface IDateRange {
    /*
     * YYYY-MM-DD
     */
    start: string;
    /*
     * YYYY-MM-DD
     */
    end: string;
}

export interface IFactory<T, TConfig> {
    create(config: NonNullable<TConfig>): Promise<T>;
}

export { ISpecification } from "@smartsoft001/models";
