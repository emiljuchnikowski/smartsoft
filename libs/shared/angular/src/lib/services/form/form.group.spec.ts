import {FormControl, FormGroup} from "@angular/forms";

import {SmartFormGroup} from "./form.group";

describe("shared-angular: SmartFormGroup", () => {
    describe("create()", () => {
        it('should create new form', function () {
            const form = SmartFormGroup.create();
            expect(form).toBeInstanceOf(SmartFormGroup);
        });
    });

    describe("setForm()", () => {
        it('should set new controls', function () {
            const baseForm = new SmartFormGroup({
                value1: new FormControl(1)
            });
            const newForm = new FormGroup({
                value2: new FormControl(2)
            });

            baseForm.setForm(newForm);

            expect(baseForm.value).toEqual({
                value1: 1,
                value2: 2
            });
        });

        it('should replace control', function () {
            const baseForm = new SmartFormGroup({
                value1: new FormControl(1)
            });
            const newForm = new FormGroup({
                value1: new FormControl(2)
            });

            baseForm.setForm(newForm);

            expect(baseForm.value.value1).toBe(2);
        });
    });
});