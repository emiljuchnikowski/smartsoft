export interface IStream {
    id: string;
    title: string;
    descriptions: string;
    comments: Array<IStreamComment>;
}

export interface IStreamComment {
    body: string;
    createDate: Date;
    username: string;
    annonimus: boolean;
}
