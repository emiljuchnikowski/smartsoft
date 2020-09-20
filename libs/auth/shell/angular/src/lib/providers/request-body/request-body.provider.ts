import {InjectionToken} from "@angular/core";

export abstract class IAuthRequestBodyProvider {
    abstract get<T>(baseBody): Promise<T>
}

export const AUTH_REQUEST_BODY_PROVIDER =
    new InjectionToken<IAuthRequestBodyProvider>('AUTH_REQUEST_BODY_REQUEST_PROVIDER');
