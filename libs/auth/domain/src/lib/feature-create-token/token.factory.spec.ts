import {Repository} from "typeorm";
import {Test, TestingModule} from "@nestjs/testing";

import {TokenFactory} from "@smartsoft001/auth-domain";
import {DomainValidationError} from "@smartsoft001/shared-domain-core";
import {TokenConfig} from "./token.config";
import {PasswordService} from "@smartsoft001/shared-utils";
import {Guid} from "guid-typescript";

describe('auth-domain-feature-create-token: TokenFactory', () => {

    let factory: TokenFactory;
    const config: TokenConfig = new TokenConfig();
    let repository;
    let baseReqPassword;

    beforeEach(async () => {
        baseReqPassword = {
            grant_type: 'password' as 'password',
            username: 'test123',
            password: '123',
            client_id: '123'
        };
        const hashPassword = await PasswordService.hash(baseReqPassword.password);
        repository = {
            findOne: (options) => Promise.resolve({ password: hashPassword }),
            update: (query, cryteria) => Promise.resolve()
        };
        config.clients.push('123');

        const module: TestingModule = await Test.createTestingModule({
           providers: [TokenFactory, { provide: TokenConfig, useValue: config }, { provide: Repository, useValue: repository }]
       }).compile();

       factory = module.get<TokenFactory>(TokenFactory);
    });

    it('should be defined', () => {
        expect(factory).toBeDefined();
    });

    describe("create()", () => {

        it("should throw errror when config is empty", async done => {
            try {
                await factory.create(null);
            } catch (e) {
                expect(e).toBeInstanceOf(DomainValidationError);
                done();
            }
        });

        it("should throw errror when grant type is empty", async done => {
            let error: Error;

            try {
                await factory.create({
                    grant_type: null
                } as any);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when grant type is incorrect", async done => {
            let error: Error;

            try {
                await factory.create({
                    grant_type: 'test'
                } as any);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when username is empty", async done => {
            let error: Error;
            baseReqPassword.username = null;

            try {
                await factory.create(baseReqPassword);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when password is empty", async done => {
            let error: Error;
            baseReqPassword.password = null;

            try {
                await factory.create(baseReqPassword);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when client_id is empty", async done => {
            let error: Error;
            baseReqPassword.client_id = null;

            try {
                await factory.create(baseReqPassword);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when client_id is incorrect", async done => {
            let error: Error;

            config.clients = [ 'test1', 'test2' ];

            try {
                await factory.create(baseReqPassword);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when refresh_token is incorrect", async done => {
            let error: Error;

            config.clients = [ 'test1', 'test2' ];

            try {
                await factory.create({
                    grant_type: 'refresh_token',
                    refresh_token: null
                });
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it('should use user query for password', async done => {
            const spy = jest.spyOn(repository, 'findOne');

            await factory.create(baseReqPassword);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({ username: baseReqPassword.username });
            done();
        });

        it('should use user query for refresh token', async done => {
            const spy = jest.spyOn(repository, 'findOne');
            const req = {
                grant_type: 'refresh_token' as 'refresh_token',
                refresh_token: 'test123'
            };

            await factory.create(req);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({ authRefreshToken: req.refresh_token });
            done();
        });

        it('should throw error when user not found', async done => {
            const spy = jest.spyOn(repository, 'findOne').mockReturnValueOnce(Promise.resolve(null));
            const req = {
                grant_type: 'refresh_token' as 'refresh_token',
                refresh_token: 'test123'
            };
            let error;

            try {
                await factory.create(req);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it('should throw error when incorrectt password', async done => {
            const hash = await PasswordService.hash('test321');
            const spy = jest.spyOn(repository, 'findOne').mockReturnValueOnce(Promise.resolve({
                password: hash
            }));

            let error;

            try {
                await factory.create(baseReqPassword);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it('should create refresh token', async done => {
            const testToken = "testToken";
            jest.spyOn(Guid, 'raw').mockReturnValueOnce(testToken);
            const spy = jest.spyOn(repository, 'update');

            await factory.create(baseReqPassword);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy)
                .toHaveBeenCalledWith({ username: baseReqPassword.username }, { authRefreshToken: testToken });
            done();
        });

    });

});
