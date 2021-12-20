import {NgModule} from "@angular/core";

export const SmartNgModule = SmartNgModuleDecorator;
export function SmartNgModuleDecorator(options: NgModule) {
    return (constructor: Function) => {
        return NgModule(options)(constructor);
    }
}
