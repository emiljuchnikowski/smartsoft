import { InjectionToken } from "@angular/core";
import {Observable} from "rxjs";

export abstract class ICrudModelPossibilitiesProvider {
  abstract get<T>(type: any): { [key: string]: Observable<{ id: any; text: string }[]> };
}

export const CRUD_MODEL_POSSIBILITIES_PROVIDER = new InjectionToken<
  ICrudModelPossibilitiesProvider
>("CRUD_MODEL_POSSIBILITIES_PROVIDER");
