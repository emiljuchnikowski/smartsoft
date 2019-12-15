import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';
import {AuthTokenRequestDto} from "../../dtos";
import {AuthService, IAuthToken} from "@smartsoft001/auth-shell-app-services";

describe('auth-shell-nestjs: TokenController', () => {
  let controller: TokenController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [AuthService]
    }).compile();

    controller = module.get<TokenController>(TokenController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {

    it('send model', () => {
      const model: AuthTokenRequestDto = {
        grant_type: "refresh_token"
      };
      const spy = jest.spyOn(service, 'create');

      controller.create(model);

      expect(spy).toHaveBeenCalledWith(model);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('get token', async done => {
      const model: AuthTokenRequestDto = {
        grant_type: "refresh_token"
      };
      const token: IAuthToken = {
        access_token: '123',
        expired_in: 21,
        refresh_token: '321',
        token_type: "bearer"
      };
      jest.spyOn(service, 'create').mockReturnValueOnce(Promise.resolve(token));

      const result = await controller.create(model);

      expect(result).toBe(token);

      done();
    })

  });
});
