import { Test, TestingModule } from '@nestjs/testing';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

import { TokenController } from './token.controller';
import {AuthService} from "@smartsoft001/auth-shell-app-services";
import {IAuthToken, IAuthTokenRequest} from "@smartsoft001/auth-domain";

describe('auth-shell-nestjs: TokenController', () => {
  let controller: TokenController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.register({
          secretOrPrivateKey: 'thisismykickasssecretthatiwilltotallychangelater',
          signOptions: {
            expiresIn: 3600
          }
        }),
      ],
      controllers: [TokenController],
      providers: [ { provide: AuthService, useValue: new AuthService(null, null) } ]
    }).compile();

    controller = module.get<TokenController>(TokenController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {

    it('send model', () => {
      const model: IAuthTokenRequest = {
        grant_type: "refresh_token",
        refresh_token: "123"
      };
      const spy = jest.spyOn(service, 'create').mockReturnValueOnce(Promise.resolve({} as any));

      controller.create(model);

      expect(spy).toHaveBeenCalledWith(model);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('get token', async () => {
      const model: IAuthTokenRequest = {
        grant_type: "refresh_token",
        refresh_token: "123"
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
    });

  });
});
