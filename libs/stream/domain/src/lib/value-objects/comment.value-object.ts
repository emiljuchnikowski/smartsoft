export class StreamComment {
    constructor(
        public readonly body: string,
        public createDate: Readonly<Date>,
        public readonly username: string,
        public readonly annonimus: Readonly<boolean> = false
    ) {
    }
}
