import {Field, getModelFieldKeys, Model} from "@smartsoft001/models";

describe('shared-models: utils', () => {

    describe('getModelFieldKeys()', () => {

        it('should return empty array when fields is not defined', () => {
            @Model({})
            class Test {
            }

            const result = getModelFieldKeys(Test);

            expect(result).toStrictEqual([ ]);
        });

        it('should return field keys array', () => {
            @Model({})
            class Test {
                @Field({}) test1;
                @Field({}) test2;
                @Field({}) test3;
            }

            const result = getModelFieldKeys(Test);

            expect(result).toStrictEqual([ 'test1', 'test2', 'test3' ]);
        });

    });

});
