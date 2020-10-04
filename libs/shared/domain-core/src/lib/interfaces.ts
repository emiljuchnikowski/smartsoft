export interface IEntity<T> {
    id: T;
}

export interface ISpecification {
    criteria: any;
}

export interface IFactory<T, TConfig> {
    create(config: NonNullable<TConfig>): Promise<T>;
}
