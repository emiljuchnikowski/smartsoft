import {Guid} from "guid-typescript";

export class GuidService {
    static create(): string {
        return Guid.raw();
    }
}
