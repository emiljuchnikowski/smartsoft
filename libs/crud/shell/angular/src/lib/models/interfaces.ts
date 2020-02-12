export interface ICrudFilter {
    searchText?: string;
    sortBy?: string;
    sortDesc?: boolean;
    offset?: number;
    limit?: number;
}
