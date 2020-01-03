import {AuthInterceptor} from "./auth/auth.interceptor";

export * from './auth/auth.interceptor';

export const INTERCEPTORS = [
  AuthInterceptor
];
