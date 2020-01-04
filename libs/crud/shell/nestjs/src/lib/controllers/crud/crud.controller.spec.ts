import { Test, TestingModule } from "@nestjs/testing";

import { CrudController } from "./crud.controller";

describe("crud-shell-nestjs: CrudController", () => {
  let controller: CrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CrudController]
    }).compile();

    controller = module.get<CrudController>(CrudController);
  });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
