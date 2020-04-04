export interface ICrudFilter {
    searchText?: string;
    sortBy?: string;
    sortDesc?: boolean;
    offset?: number;
    limit?: number;
    query?: Array<ICrudFilterQueryItem>
}

export interface ICrudFilterQueryItem {
    key: string;
    value: any;
    type: '=' | '!=' | '>=' | '<=' | '<' | '>';
}
