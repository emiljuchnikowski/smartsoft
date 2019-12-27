import 'jest-preset-angular';

import {TestBed} from "@angular/core/testing";

import {FormFactory} from "./form.factory";
import {Field, Model} from "@smartsoft001/shared-models";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

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

        it('should throw error when not mark class', async done => {
            class Test {}

            try {
                await factory.create(new Test());
            } catch (e) {
                done();
            }
        });

        it('should not throw error when not mark class', async done => {
            @Model({})
            class Test {}

            await factory.create(new Test());
            done();
        });

        xit('should create controls for all fields', async done => {
            @Model({})
            class Test {
                @Field({})
                firstName = '';

                @Field({})
                lastName: string;
            }

            const form: FormGroup = await factory.create(new Test());

            expect(form.controls['firstName']).toBeDefined();
            expect(form.controls['lastName']).toBeDefined();
            done();
        });

    });

});
