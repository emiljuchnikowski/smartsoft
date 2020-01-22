import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, ElementRef, Renderer2, Type} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import { Location } from '@angular/common';
import {RouterTestingModule} from "@angular/router/testing";

import {PageBaseComponent} from "./base.component";

describe('shared-angular: PageBaseComponent', () => {

    @Component({
        // tslint:disable-next-line:component-selector
        selector: 'smartsoft-test',
        template: 'test'
    })
    class TestFormBaseComponent extends PageBaseComponent {
        constructor(el: ElementRef, r: Renderer2, l: Location) {
            super(el, r, l);
        }
    }

    let renderer2: Renderer2;
    let component: TestFormBaseComponent;
    let fixture: ComponentFixture<TestFormBaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TestFormBaseComponent ],
            imports: [ TranslateModule.forRoot(), RouterTestingModule  ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFormBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
        it('should set 100% height', () => {
            const spy = jest.spyOn(renderer2, 'setStyle');

            component.ngOnInit();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(expect.anything(), 'height', '100%');
        });
    });
});
