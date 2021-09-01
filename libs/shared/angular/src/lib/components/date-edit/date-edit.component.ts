import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output} from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as moment from "moment";
import {IonInput} from "@ionic/angular";

@Component({
    selector: "smart-date-edit",
    templateUrl: "./date-edit.component.html",
    styleUrls: [
        "./date-edit.component.scss"
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateEditComponent), multi: true }
    ]
})
export class DateEditComponent implements ControlValueAccessor {
    DEFAULT_DATE = '2001-01-01';

    get d1(): string {
        if (!this.value) return null;
        return this.value[8];
    }
    set d1(val: string) {
        if (val === null) return;
        const newValue = Number(val);
        if (!this.value || newValue > 9 || newValue < 0) this.value = this.DEFAULT_DATE;
        this.value = this.setCharAt(this.value, 8, newValue);
        this.writeValue(this.value);
        this.propagateChange(this.value);
        this.propagateTouched();
    }
    get d2(): string {
        if (!this.value) return null;
        return this.value[9];
    }
    set d2(val: string) {
        if (val === null) return;
        const newValue = Number(val);
        if (!this.value || newValue > 9 || newValue < 0) this.value = this.DEFAULT_DATE;
        this.value = this.setCharAt(this.value, 9, newValue);
        this.writeValue(this.value);
        this.propagateChange(this.value);
        this.propagateTouched();
    }

    get m1(): string {
        if (!this.value) return null;
        return this.value[5];
    }
    set m1(val: string) {
        if (val === null) return;
        const newValue = Number(val);
        if (!this.value || newValue > 9 || newValue < 0) this.value = this.DEFAULT_DATE;
        this.value = this.setCharAt(this.value, 5, newValue);
        this.writeValue(this.value);
        this.propagateChange(this.value);
        this.propagateTouched();
    }
    get m2(): string {
        if (!this.value) return null;
        return this.value[6];
    }
    set m2(val: string) {
        if (val === null) return;
        const newValue = Number(val);
        if (!this.value || newValue > 9 || newValue < 0) this.value = this.DEFAULT_DATE;
        this.value = this.setCharAt(this.value, 6, newValue);
        this.writeValue(this.value);
        this.propagateChange(this.value);
        this.propagateTouched();
    }

    get y1(): string {
        if (!this.value) return null;
        return this.value[0];
    }
    set y1(val: string) {
        if (val === null) return;
        const newValue = Number(val);
        if (!this.value || newValue > 9 || newValue < 0) this.value = this.DEFAULT_DATE;
        this.value = this.setCharAt(this.value, 0, newValue);
        this.writeValue(this.value);
        this.propagateChange(this.value);
        this.propagateTouched();
    }
    get y2(): string {
        if (!this.value) return null;
        return this.value[1];
    }
    set y2(val: string) {
        if (val === null) return;
        const newValue = Number(val);
        if (!this.value || newValue > 9 || newValue < 0) this.value = this.DEFAULT_DATE;
        this.value = this.setCharAt(this.value, 1, newValue);
        this.writeValue(this.value);
        this.propagateChange(this.value);
        this.propagateTouched();
    }
    get y3(): string {
        if (!this.value) return null;
        return this.value[2];
    }
    set y3(val: string) {
        if (val === null) return;
        const newValue = Number(val);
        if (!this.value || newValue > 9 || newValue < 0) this.value = this.DEFAULT_DATE;
        this.value = this.setCharAt(this.value, 2, newValue);
        this.writeValue(this.value);
        this.propagateChange(this.value);
        this.propagateTouched();
    }
    get y4(): string {
        if (!this.value) return null;
        return this.value[3];
    }
    set y4(val: string) {
        if (val === null) return;
        const newValue = Number(val);
        if (!this.value || newValue > 9 || newValue < 0) this.value = this.DEFAULT_DATE;
        this.value = this.setCharAt(this.value, 3, newValue);
        this.writeValue(this.value);
        this.propagateChange(this.value);
        this.propagateTouched();
    }

    value: any = this.DEFAULT_DATE;

    propagateChange = val => {};
    propagateTouched = () => {};

    @Input() set ngModel(val: string) {
        this.value = val;
    }
    @Output() ngModelChange = new EventEmitter<string>();

    constructor(
        private cd: ChangeDetectorRef,
    ) { }

    writeValue(value): void {
        this.value = value;
        this.cd.detectChanges();
    }

    registerOnChange(fn) : void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) : void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean) : void {}

    onClear(): void {
        this.value = null;

        this.ngModelChange.emit(this.value);
        this.propagateChange(this.value);
        this.propagateTouched();
    }

    private setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }

    async moveTo(event: KeyboardEvent, el: IonInput): Promise<void> {
        if (event.key === 'Backspace' || event.key === 'Enter') return;

        const allowKeys = ["0","1","2","3","4","5","6","7","8","9"];

        if (!allowKeys.some(k => k === event.key)) {
            (event.target as HTMLInputElement).value = "0";
            return;
        }

        (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value.substr(0, 1);

        await el.setFocus();

        await this.select(el);
    }

    async select(el: IonInput): Promise<void> {
        setTimeout(async () => {
            const nativeEl: HTMLInputElement = await el.getInputElement();

            if (nativeEl) {
                if (nativeEl.setSelectionRange) {
                    nativeEl.type = 'text';
                    nativeEl.setSelectionRange(0, nativeEl.value.length);
                    nativeEl.type = 'number';
                    return;
                }

                nativeEl.select();
            }
        });
    }
}