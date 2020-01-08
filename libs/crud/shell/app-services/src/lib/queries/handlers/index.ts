import {GetByIdHandler} from "./get-by-id/get-by-id.handler";
import {GetByCriteriaHandler} from "./get-by-criteria/get-by-criteria.handler";

export const QUERY_HANDLERS = [
    GetByIdHandler,
    GetByCriteriaHandler
];
