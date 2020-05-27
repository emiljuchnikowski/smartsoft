import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

import {AUTH_TOKEN, AuthService} from "./auth.service";
import { AuthConfig } from "../../auth.config";

describe("auth-shell-angular: AuthService", () => {

  let service: AuthService;
  let config: AuthConfig;
  let http: HttpClient;

  beforeEach(() => {
    config = new AuthConfig();
    config.apiUrl = "testUrl";
    config.clientId = "testClientId";

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: AuthConfig, useValue: config }]
    });

    service = TestBed.get(AuthService);
    http = TestBed.get(HttpClient);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("createToken()", () => {

    it('should invoke sessionStorage', async done => {
      const username = "testUser";
      const password = "testPassword";
      const mockToken = {} as any;
      jest.spyOn(http, "post").mockReturnValue(of(mockToken));

      await service.createToken({ username, password }).toPromise();
      const result = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));

      expect(result).toStrictEqual(mockToken);
      done()
    });

    it('should return token', async done => {
      const username = "testUser";
      const password = "testPassword";
      const mockToken = {} as any;
      jest.spyOn(http, "post").mockReturnValue(of(mockToken));

      const result = await service.createToken({ username, password }).toPromise();

      expect(result).toBe(mockToken);
      done()
    });

  });

  describe("refreshToken()", () => {

    it('should invoke sessionStorage', async done => {
      const mockToken = {} as any;
      sessionStorage.setItem(AUTH_TOKEN, '{}');
      jest.spyOn(http, "post").mockReturnValue(of(mockToken));

      await service.refreshToken().toPromise();
      const result = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));

      expect(result).toStrictEqual(mockToken);
      done()
    });

    it('should pass form data and url', async done => {
      const refreshToken = "testToken";
      const mockToken = {} as any;
      const spy = jest.spyOn(http, "post").mockReturnValue(of(mockToken));
      const url = config.apiUrl + '/token';
      sessionStorage.setItem(AUTH_TOKEN, JSON.stringify({ refresh_token: refreshToken }));

      await service.refreshToken().toPromise();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(url, { grant_type: 'refresh_token', refresh_token: refreshToken  });
      done()
    });

    it('should return token', async done => {
      const mockToken = {} as any;
      jest.spyOn(http, "post").mockReturnValue(of(mockToken));

      const result = await service.refreshToken().toPromise();

      expect(result).toBe(mockToken);
      done()
    });

  });

  describe("removeToken()", () => {

    it('should invoke sessionStorage', () => {
      sessionStorage.setItem(AUTH_TOKEN, "test");

      service.removeToken();
      const result = sessionStorage.getItem(AUTH_TOKEN);

      expect(!!result).not.toBeTruthy();
    });

  });

  describe("token", () => {

    it('should return from storage', async done => {
      sessionStorage.setItem(AUTH_TOKEN, "{}");

      const result = service.token;

      expect(result).toStrictEqual({});
      done()
    });

  });
});
