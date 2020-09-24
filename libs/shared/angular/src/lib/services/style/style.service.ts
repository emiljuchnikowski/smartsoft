import {ElementRef, Injectable} from "@angular/core";

import {IStyle, StyleType} from "../../models/style";

@Injectable()
export class StyleService {
    private _elementRef: ElementRef;
    private _style: IStyle;

    static create(el: ElementRef, style?: Partial<IStyle>): StyleService {
        const result = new StyleService();

        result.init(el, style);

        return result;
    }

    init(el: ElementRef, style?: Partial<IStyle>): void {
        this._elementRef = el;
        this.set(style);
    }

    set(style?: Partial<IStyle>): void {
        if (!style) style = {};

        if (!this._style) this._style = {};

        this._style = {
            ...this._style,
            ...style
        };

        this.execute();
    }

    private execute(): void {
        console.log(this._style);

        this.setColor('primary');
        this.setColor('secondary');
        this.setColor('tertiary');
        this.setColor('success');
        this.setColor('warning');
        this.setColor('danger');
        this.setColor('dark');
        this.setColor('medium');
        this.setColor('light');
    }

    private setColor(name: string): void {
        this.setProperty(`--smart-color-${name}`, `color-${name}` as StyleType);
        this.setProperty(`--smart-color-${name}-rgb`, `color-${name}-rgb` as StyleType);
        this.setProperty(`--smart-color-${name}-contrast`, `color-${name}-contrast` as StyleType);
        this.setProperty(`--smart-color-${name}-contrast-rgb`, `color-${name}-contrast-rgb` as StyleType);
        this.setProperty(`--smart-color-${name}-shade`, `color-${name}-shade` as StyleType);
        this.setProperty(`--smart-color-${name}-tint`, `color-${name}-tint` as StyleType);

        this.setProperty(`--ion-color-${name}`, `color-${name}` as StyleType);
        this.setProperty(`--ion-color-${name}-rgb`, `color-${name}-rgb` as StyleType);
        this.setProperty(`--ion-color-${name}-contrast`, `color-${name}-contrast` as StyleType);
        this.setProperty(`--ion-color-${name}-contrast-rgb`, `color-${name}-contrast-rgb` as StyleType);
        this.setProperty(`--ion-color-${name}-shade`, `color-${name}-shade` as StyleType);
        this.setProperty(`--ion-color-${name}-tint`, `color-${name}-tint` as StyleType);
    }

    private setProperty(property: string, type: StyleType): void {
        if (!this._style[type]) return;

        const native: HTMLElement = this._elementRef.nativeElement;
        native.style.setProperty(property, this._style[type]);
    }
}
