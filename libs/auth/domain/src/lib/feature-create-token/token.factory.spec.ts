import {Repository} from "typeorm";
import {Test, TestingModule} from "@nestjs/testing";

import {TokenFactory} from "@smartsoft001/auth-domain";
import {DomainValidationError} from "@smartsoft001/shared-domain-core";
import {TokenConfig} from "./token.config";

describe('auth-domain-feature-create-token: TokenFactory', () => {

    let factory: TokenFactory;
    let config: TokenConfig;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
           providers: [TokenFactory, TokenConfig, { provide: Repository, useValue: {} }]
       }).compile();

       factory = module.get<TokenFactory>(TokenFactory);
       config = module.get<TokenConfig>(TokenConfig);
    });

    it('should be defined', () => {
        expect(factory).toBeDefined();
    });

    describe("create()", () => {

        it("should throw errror when config is empty", done => {
            try {
                factory.create(null);
            } catch (e) {
                expect(e).toBeInstanceOf(DomainValidationError);
                done();
            }
        });

        it("should throw errror when grant type is empty", done => {
            let error: Error;

            try {
                factory.create({
                    grant_type: null
                } as any);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when grant type is incorrect", done => {
            let error: Error;

            try {
                factory.create({
                    grant_type: 'test'
                } as any);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when username is empty", done => {
            let error: Error;

            try {
                factory.create({
                    grant_type: 'password',
                    username: null,
                    password: '123',
                    client_id: '123'
                });
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when password is empty", done => {
            let error: Error;

            try {
                factory.create({
                    grant_type: 'password',
                    username: 'test123',
                    password: null,
                    client_id: '123'
                });
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when client_id is empty", done => {
            let error: Error;

            try {
                factory.create({
                    grant_type: 'password',
                    username: 'test123',
                    password: '123',
                    client_id: null
                });
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when client_id is incorrect", done => {
            let error: Error;

            config.clients = [ 'test1', 'test2' ];

            try {
                factory.create({
                    grant_type: 'password',
                    username: 'test123',
                    password: '123',
                    client_id: 'test3'
                });
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

        it("should throw errror when refresh_token is incorrect", done => {
            let error: Error;

            config.clients = [ 'test1', 'test2' ];

            try {
                factory.create({
                    grant_type: 'refresh_token',
                    refresh_token: null
                });
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(DomainValidationError);
            done();
        });

    });

});
