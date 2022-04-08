import {Directive, ExistingProvider, forwardRef} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
// @ts-ignore
import moment from "moment";

const DATE_VALIDATOR : ExistingProvider = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DateValidator),
    multi: true
};

@Directive({
    selector: '[smartDateValidator][formControlName],[smartDateValidator][formControl],[smartDateValidator][ngModel]',
    providers: [DATE_VALIDATOR]
})
export class DateValidator implements Validator {
    validate(c: AbstractControl): {[key: string]: any} {
        if (!moment(c.value).isValid()) {
            return {
                date: true
            }
        }

        return null;
    }
}
