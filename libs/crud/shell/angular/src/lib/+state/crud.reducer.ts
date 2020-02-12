import {IEntity} from "@smartsoft001/domain-core";
import {Action} from "@ngrx/store";

import {ICrudFilter} from "../models/interfaces";

export interface State<T extends IEntity<string>> {
    selected?: T;
    list?: T[];
    totalCount?: number;
    filter?: ICrudFilter;
    links?: any;
    loaded: boolean; // has the Auth list been loaded
    error?: string | null; // last none error (if any)
}

export const initialState: State<any> = {
    loaded: false
};

const crudReducer = (state = initialState, action, entity) => {
    switch (action.type) {
        case `[${entity}] Create`:
            return {
                ...state,
                loaded: false,
                error: null
            };

        case `[${entity}] Create Success`:
            return {
                ...state,
                loaded: true,
                error: null
            };

        case `[${entity}] Create Failure`:
            return {
                ...state,
                loaded: true,
                error: action.error
            };

        case `[${entity}] Read`:
            return {
                ...state,
                loaded: false,
                filter: action.filter,
                error: null,
                list: null,
                totalCount: null,
                links: null,
            };

        case `[${entity}] Read Success`:
            return {
                ...state,
                loaded: true,
                list: action.result.data,
                totalCount: action.result.totalCount,
                links: action.result.links,
                error: null
            };

        case `[${entity}] Read Failure`:
            return {
                ...state,
                loaded: true,
                error: action.error
            };

        case `[${entity}] Select`:
            return {
                ...state,
                loaded: false,
                selected: null,
                error: null
            };

        case `[${entity}] Select Success`:
            return {
                ...state,
                loaded: true,
                selected: action.item,
                error: null
            };

        case `[${entity}] Select Failure`:
            return {
                ...state,
                loaded: true,
                error: action.error
            };

        case `[${entity}] Unselect`:
            return {
                ...state,
                loaded: true,
                selected: null,
                error: null
            };

        case `[${entity}] Update`:
            return {
                ...state,
                loaded: false,
                error: null
            };

        case `[${entity}] Update Success`:
            return {
                ...state,
                loaded: true,
                error: null
            };

        case `[${entity}] Update Failure`:
            return {
                ...state,
                loaded: true,
                error: action.error
            };

        case `[${entity}] Update partial`:
            return {
                ...state,
                loaded: false,
                error: null
            };

        case `[${entity}] Update partial Success`:
            return {
                ...state,
                loaded: true,
                error: null
            };

        case `[${entity}] Update partial Failure`:
            return {
                ...state,
                loaded: true,
                error: action.error
            };

        case `[${entity}] Delete`:
            return {
                ...state,
                loaded: false,
                error: null
            };

        case `[${entity}] Delete Success`:
            return {
                ...state,
                loaded: true,
                error: null
            };

        case `[${entity}] Delete Failure`:
            return {
                ...state,
                loaded: true,
                error: action.error
            };

        default:
            return state;
    }
};

export function getReducer(entity) {
    return (state, action: Action) => {
        return crudReducer(state, action, entity);
    }
}
