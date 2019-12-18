import { PasswordService } from "@smartsoft001/shared-utils";

describe("shared-utils: PasswordService", () => {
  it("should hash", async done => {
    const result = await PasswordService.hash("test");

    expect(result).toBeDefined();
    done();
  });

  it("should compare", async done => {
    const password = "test";
    const hash = await PasswordService.hash(password);

    const result = await PasswordService.compare(password, hash);

    expect(result).toBeTruthy();
    done();
  });
});
