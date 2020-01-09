import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ChangeDetectorRef, Component} from "@angular/core";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

import { AppBaseComponent } from './base.component';

describe('shared-angular: AppBaseComponent', () => {
    @Component({
        // tslint:disable-next-line:component-selector
        selector: 'smartsoft-test',
        template: 'test'
    })
    class TestFormBaseComponent extends AppBaseComponent {
        constructor(router: Router, cd: ChangeDetectorRef) {
            super(router, cd);
        }
    }

    let component: TestFormBaseComponent;
    let fixture: ComponentFixture<TestFormBaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TestFormBaseComponent ],
            imports: [ RouterTestingModule ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFormBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('showMenu$', () => {
        it('should true when logged and block for anonymous', done => {
            component.options = {
                provider: {
                    logged$: of(true)
                },
                menu: {
                    showForAnonymous: false
                }
            };

            setTimeout(() => {
                component.showMenu$.subscribe(show => {
                    expect(show).toBeTruthy();
                    done();
                });
            });
        });

        it('should true when not logged and allow for anonymous', done => {
            component.options = {
                provider: {
                    logged$: of(false)
                },
                menu: {
                    showForAnonymous: true
                }
            };

            setTimeout(() => {
                component.showMenu$.subscribe(show => {
                    expect(show).toBeTruthy();
                    done();
                });
            });
        });

        it('should false when not logged and block for anonymous', done => {
            component.options = {
                provider: {
                    logged$: of(false)
                },
                menu: {
                    showForAnonymous: false
                }
            };

            setTimeout(() => {
                component.showMenu$.subscribe(show => {
                    expect(show).not.toBeTruthy();
                    done();
                });
            });
        });
    });

    describe('menuItems$', () => {
        it('should set from option', () => {
            const menuItems$ = of([]);
            component.options = {
                provider: {
                    logged$: of(false)
                },
                menu: {
                    showForAnonymous: true,
                    items$: menuItems$
                }
            };

            expect(component.menuItems$).toBe(menuItems$);
        });
    })
});
