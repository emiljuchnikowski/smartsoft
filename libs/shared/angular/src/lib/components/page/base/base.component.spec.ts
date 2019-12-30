import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component} from "@angular/core";

import {PageBaseComponent} from "./base.component";

describe('shared-angular: PageBaseComponent', () => {
    @Component({
        // tslint:disable-next-line:component-selector
        selector: 'smartsoft-test',
        template: 'test'
    })
    class TestFormBaseComponent extends PageBaseComponent {

    }

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
});
