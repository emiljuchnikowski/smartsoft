import 'jest-preset-angular';

import {TestBed} from "@angular/core/testing";

import {FormFactory} from "./form.factory";
import {Field, Model} from "@smartsoft001/models";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

describe("shared-angular: FormFactory", () => {

    let factory: FormFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ FormFactory ],
            imports: [
                ReactiveFormsModule
            ]
        });

        factory = TestBed.get(FormFactory);
    });

    it('should init', () => {
        expect(factory).toBeDefined();
    });

    describe("create()", () => {

        it('should throw error when not mark class', async () => {
            class Test {}

            try {
                await factory.create(new Test());

                throw Error();
            } catch (e) {

            }
        });

        it('should not throw error when not mark class', async () => {
            @Model({})
            class Test {}

            await factory.create(new Test());
        });

        it('should create controls for all fields', async () => {
            @Model({})
            class Test {
                @Field({})
                firstName = '';

                @Field({})
                lastName: string;
            }

            const form: FormGroup = await factory.create(new Test());

            expect(form.controls['firstName']).toBeInstanceOf(FormControl);
            expect(form.controls['lastName']).toBeInstanceOf(FormControl);
        });

        it('should set required validator', async () => {
            @Model({})
            class Test {
                @Field({})
                firstName = '';

                @Field({ required: true })
                lastName: string;
            }

            const form: FormGroup = await factory.create(new Test());
            form.controls['lastName'].updateValueAndValidity();

            expect(!!form.controls['lastName'].validator).toBeTruthy();
            expect(form.invalid).toBeTruthy();

            form.controls['lastName'].setValue('123');
            form.controls['lastName'].updateValueAndValidity();

            expect(form.valid).toBeTruthy();
        });

    });

});
