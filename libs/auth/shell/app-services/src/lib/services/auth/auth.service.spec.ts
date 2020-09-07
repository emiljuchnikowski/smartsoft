import { Test, TestingModule } from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "./auth.service";
import {
  IAuthToken,
  IAuthTokenRequest,
  TokenConfig,
  TokenFactory, User
} from "@smartsoft001/auth-domain";

describe("auth-shell-app-services: AuthService", () => {
  let service: AuthService;
  let factory: TokenFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: "jwt", session: false }),
        JwtModule.register({
          secretOrPrivateKey:
            "thisismykickasssecretthatiwilltotallychangelater",
          signOptions: {
            expiresIn: 3600
          }
        })
      ],
      providers: [
        TokenFactory,
        TokenConfig,
        { provide: getRepositoryToken(User), useValue: {} }
      ]
    }).compile();

    factory = module.get<TokenFactory>(TokenFactory);
    service = new AuthService(factory);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create()", () => {
    it("should set request", () => {
      const model: IAuthTokenRequest = {
        grant_type: "refresh_token",
        refresh_token: "123"
      };
      const spy = jest.spyOn(factory, "create");

      service.create(model);

      expect(spy).toHaveBeenCalledWith(model);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("get token", async () => {
      const model: IAuthTokenRequest = {
        grant_type: "refresh_token",
        refresh_token: "123"
      };
      const token: IAuthToken = {
        access_token: "123",
        expired_in: 21,
        refresh_token: "321",
        token_type: "bearer"
      };
      jest.spyOn(factory, "create").mockReturnValueOnce(Promise.resolve(token));

      const result = await service.create(model);

      expect(result).toBe(token);
    });
  });
});
