import { Test, TestingModule } from "@nestjs/testing";
import { Guid } from "guid-typescript";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {getRepositoryToken} from "@nestjs/typeorm";

import {TokenFactory, User} from "@smartsoft001/auth-domain";
import { DomainValidationError } from "@smartsoft001/domain-core";
import { TokenConfig } from "./token.config";
import { PasswordService } from "@smartsoft001/utils";

describe("auth-domain-feature-create-token: TokenFactory", () => {
  let factory: TokenFactory;
  let jwtService: JwtService;
  const config: TokenConfig = new TokenConfig();
  let repository;
  let baseReqPassword;
  let user;

  beforeEach(async () => {
    baseReqPassword = {
      grant_type: "password" as "password",
      username: "test123",
      password: "123",
      client_id: "123"
    };
    const hashPassword = await PasswordService.hash(baseReqPassword.password);
    user = { password: hashPassword, username: "testname" };
    repository = {
      findOne: () => Promise.resolve(user),
      update: () => Promise.resolve()
    };
    config.clients.push("123");
    config.expiredIn = 60 * 10;

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
        { provide: TokenConfig, useValue: config },
        { provide: getRepositoryToken(User), useValue: repository }
      ]
    }).compile();

    factory = module.get<TokenFactory>(TokenFactory);
    jwtService = module.get<JwtService>(JwtService);
  });

  it("should be defined", () => {
    expect(factory).toBeDefined();
  });

  describe("create()", () => {
    it("should throw errror when config is empty", async () => {
      try {
        await factory.create(null);
        throw Error();
      } catch (e) {
        expect(e).toBeInstanceOf(DomainValidationError);
      }
    });

    it("should throw errror when grant type is empty", async () => {
      let error: Error;

      try {
        await factory.create({
          grant_type: null
        } as any);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(DomainValidationError);
    });

    it("should throw errror when grant type is incorrect", async () => {
      let error: Error;

      try {
        await factory.create({
          grant_type: "test"
        } as any);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(DomainValidationError);
    });

    it("should throw errror when username is empty", async () => {
      let error: Error;
      baseReqPassword.username = null;

      try {
        await factory.create(baseReqPassword);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(DomainValidationError);
    });

    it("should throw errror when password is empty", async () => {
      let error: Error;
      baseReqPassword.password = null;

      try {
        await factory.create(baseReqPassword);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(DomainValidationError);
    });

    it("should throw errror when client_id is empty", async () => {
      let error: Error;
      baseReqPassword.client_id = null;

      try {
        await factory.create(baseReqPassword);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(DomainValidationError);
    });

    it("should throw errror when client_id is incorrect", async () => {
      let error: Error;

      config.clients = ["test1", "test2"];

      try {
        await factory.create(baseReqPassword);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(DomainValidationError);
    });

    it("should throw errror when refresh_token is incorrect", async () => {
      let error: Error;

      config.clients = ["test1", "test2"];

      try {
        await factory.create({
          request: {
            grant_type: "refresh_token",
            refresh_token: null
          }
        });
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(DomainValidationError);
    });

    it("should use user query for password", async () => {
      const spy = jest.spyOn(repository, "findOne");

      await factory.create(baseReqPassword);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ username: baseReqPassword.username });
    });

    it("should use user query for refresh token", async () => {
      const spy = jest.spyOn(repository, "findOne");
      const req = {
        grant_type: "refresh_token" as "refresh_token",
        refresh_token: "test123"
      };

      await factory.create({
        request: req
      });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ authRefreshToken: req.refresh_token });
    });

    it("should throw error when user not found", async () => {
      jest
        .spyOn(repository, "findOne")
        .mockReturnValueOnce(Promise.resolve(null));
      const req = {
        grant_type: "refresh_token" as "refresh_token",
        refresh_token: "test123"
      };
      let error;

      try {
        await factory.create({
          request: req
        });
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(DomainValidationError);
    });

    it("should throw error when incorrectt password", async () => {
      const hash = await PasswordService.hash("test321");
      jest.spyOn(repository, "findOne").mockReturnValueOnce(
        Promise.resolve({
          password: hash
        })
      );

      let error;

      try {
        await factory.create(baseReqPassword);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(DomainValidationError);
    });

    it("should create refresh token", async () => {
      const testToken = "testToken";
      jest.spyOn(Guid, "raw").mockReturnValueOnce(testToken);
      const spy = jest.spyOn(repository, "update");

      await factory.create(baseReqPassword);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        { username: baseReqPassword.username },
        { authRefreshToken: testToken }
      );
    });

    it("should create refresh token with expiredIn", async () => {
      const result = await factory.create(baseReqPassword);

      expect(result.expired_in).toBe(config.expiredIn);
    });

    it("should create refresh token with correct type", async () => {
      const result = await factory.create(baseReqPassword);

      expect(result.token_type).toBe("bearer");
    });

    it("should create correct refresh token", async () => {
      const testToken = "testToken";
      jest.spyOn(Guid, "raw").mockReturnValueOnce(testToken);

      const result = await factory.create(baseReqPassword);

      expect(result.refresh_token).toBe(testToken);
    });

    it("should throw error when user disabled", async () => {
      user.disabled = true;

      let error;

      try {
        await factory.create(baseReqPassword);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(DomainValidationError);
    });

    it("should create correct access token", async () => {
      const testToken = "testToken";
      const spy = jest.spyOn(jwtService, "sign").mockReturnValueOnce(testToken);

      const result = await factory.create(baseReqPassword);

      expect(result.access_token).toBe(testToken);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        {
          permissions: user.permissions
        },
        {
          expiresIn: config.expiredIn,
          subject: user.username
        }
      );
    });
  });
});
