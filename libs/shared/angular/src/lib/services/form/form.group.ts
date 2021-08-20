import { FormGroup } from "@angular/forms";

export class SmartFormGroup extends FormGroup {
    static create(): SmartFormGroup {
        return new SmartFormGroup({});
    }

    setForm(form: FormGroup): void {
        Object.keys(form.controls).forEach(key => {
            if (this.controls[key]) this.removeControl(key);
            this.addControl(key, form.controls[key]);
        });
    }
}