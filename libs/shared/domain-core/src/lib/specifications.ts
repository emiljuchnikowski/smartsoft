import {ISpecification} from "./interfaces";

export class MergeSpecification implements ISpecification {
    criteria: any;

    constructor(...spec: Array<ISpecification>) {
        this.criteria = {};

        spec.forEach(s => {
           this.criteria = {
               ...this.criteria,
               ...s.criteria
           }
        });
    }
}

export class OrSpecification implements ISpecification {
    criteria: any;

    constructor(...spec: Array<ISpecification>) {
        this.criteria = {
            $or: spec
        };
    }
}

export class AndSpecification implements ISpecification {
    criteria: any;

    constructor(...spec: Array<ISpecification>) {
        this.criteria = {
            $and: spec
        };
    }
}
