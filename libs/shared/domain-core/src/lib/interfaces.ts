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

export interface ISpecification {
    criteria: any;
}

export interface IFactory<T, TConfig> {
    create(config: NonNullable<TConfig>): Promise<T>;
}
