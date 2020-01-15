import {Action} from "@ngrx/store";
import {IEntity} from "@smartsoft001/domain-core";

/*
 * Create
 */
export const create = function <T extends IEntity<string>>(entity: string, item: T): Action & { item: T } {
    return {
        type: `[${entity}] Create`,
        item
    };
};

export const createSuccess = function <T extends IEntity<string>>(entity: string, item: T): Action & { item: T } {
    return {
        type: `[${entity}] Create Success`,
        item
    };
};

export const createFailure = function <T extends IEntity<string>>(entity: string, item: T, error): Action & { item: T, error } {
    return {
        type: `[${entity}] Create Failure`,
        item,
        error
    };
};

/*
 * Read
 */
export const read = function <F>(entity: string, filter: F = null): Action & { filter: F } {
    return {
        type: `[${entity}] Read`,
        filter
    };
};

export const readSuccess = function <T extends IEntity<string>, F>(
    entity: string,
    filter: F,
    result: { data: T[], totalCount: number, links }): Action & { result: { data: T[], totalCount: number, links }, filter: F } {
    return {
        type: `[${entity}] Read Success`,
        result,
        filter
    };
};

export const readFailure = function <F>(entity: string, filter: F, error): Action & { filter: F, error } {
    return {
        type: `[${entity}] Read Failure`,
        filter,
        error
    };
};

/*
 * Select
 */
export const select = function (entity: string, id: string): Action & { id: string } {
    return {
        type: `[${entity}] Select`,
        id
    };
};

export const selectSuccess = function <T extends IEntity<string>, F>(
    entity: string, id: string, item: T): Action & { id: string, item: T } {
    return {
        type: `[${entity}] Select Success`,
        id,
        item
    };
};

export const selectFailure = function <F>(entity: string, id: string, error): Action & { id: string, error } {
    return {
        type: `[${entity}] Select Failure`,
        id,
        error
    };
};

export const unselect = function (entity: string): Action {
    return {
        type: `[${entity}] Unselect`
    };
};

/*
 * Update
 */
export const update = function <T extends IEntity<string>>(entity: string, item: T): Action & { item: T } {
    return {
        type: `[${entity}] Update`,
        item
    };
};

export const updateSuccess = function <T extends IEntity<string>>(entity: string, item: T): Action & { item: T } {
    return {
        type: `[${entity}] Update Success`,
        item
    };
};

export const updateFailure = function <T extends IEntity<string>>(entity: string, item: T, error): Action & { item: T, error } {
    return {
        type: `[${entity}] Update Failure`,
        item,
        error
    };
};

/*
 * Update partial
 */
export const updatePartial = function <T extends IEntity<string>>(
    entity: string, item: Partial<T> & { id: string }): Action & { item: Partial<T> & { id: string } } {
    return {
        type: `[${entity}] Update partial`,
        item
    };
};

export const updatePartialSuccess = function <T extends IEntity<string>>(
    entity: string, item: Partial<T> & { id: string }): Action & { item: Partial<T> & { id: string } } {
    return {
        type: `[${entity}] Update partial Success`,
        item
    };
};

export const updatePartialFailure = function <T extends IEntity<string>>(
    entity: string, item: Partial<T> & { id: string }, error): Action & { item: Partial<T> & { id: string }, error } {
    return {
        type: `[${entity}] Update partial Failure`,
        item,
        error
    };
};

/*
 * Delete
 */
export const deleteItem = function (entity: string, id: string): Action & { id: string } {
    return {
        type: `[${entity}] Delete`,
        id
    };
};

export const deleteSuccess = function (entity: string, id: string): Action & { id: string } {
    return {
        type: `[${entity}] Delete Success`,
        id
    };
};

export const deleteFailure = function <F>(entity: string, id: string, error): Action & { id: string, error } {
    return {
        type: `[${entity}] Delete Failure`,
        id,
        error
    };
};

