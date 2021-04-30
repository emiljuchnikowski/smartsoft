import {SpecificationService} from "@smartsoft001/utils";

describe("shared-utils: SpecificationService", () => {
    describe("getSqlCriteria()", () => {
        it("should return string query for string criteria", () => {
            const criteria = { a: "test" };

            const result = SpecificationService.getSqlCriteria({ criteria });

            expect(result).toBe("a = 'test'");
        });

        it("should return number query for number criteria", () => {
            const criteria = { a: 3 };

            const result = SpecificationService.getSqlCriteria({ criteria });

            expect(result).toBe("a = 3");
        });

        it("should return query with and key for many keys", () => {
            const criteria = { a: 3, b: "test" };

            const result = SpecificationService.getSqlCriteria({ criteria });

            expect(result).toBe("a = 3 and b = 'test'");
        });
    });
});