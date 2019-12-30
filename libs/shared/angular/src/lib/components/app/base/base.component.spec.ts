import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component} from "@angular/core";

import { AppBaseComponent } from './base.component';
import {of} from "rxjs";

describe('shared-angular: AppBaseComponent', () => {
    @Component({
        // tslint:disable-next-line:component-selector
        selector: 'smartsoft-test',
        template: 'test'
    })
    class TestFormBaseComponent extends AppBaseComponent { }

    let component: TestFormBaseComponent;
    let fixture: ComponentFixture<TestFormBaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TestFormBaseComponent ]
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
                facade: {
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
                facade: {
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
                facade: {
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
});
