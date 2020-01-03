import "jest-preset-angular";

import { TestBed } from "@angular/core/testing";
import {TestScheduler} from "rxjs/testing";
import {Observable} from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { NxModule } from "@nrwl/angular";
import {EffectsModule} from "@ngrx/effects";

import {ErrorEffects} from "./error.effects";
import {ErrorService, ToastService} from "../services";
import {TranslateModule} from "@ngx-translate/core";

describe("shared-angular: ErrorEffects", () => {
  let effects: ErrorEffects;
  let service: ErrorService;
  let scheduler: TestScheduler;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), EffectsModule.forRoot([ErrorEffects]), TranslateModule.forRoot()],
      providers: [
        ErrorEffects,
        ErrorService,
        ToastService,
        provideMockStore(),
        provideMockActions(() => actions)
      ]
    });

    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    effects = TestBed.get(ErrorEffects);
    service = TestBed.get(ErrorService);
  });

  it('should created', () => {
    expect(effects).toBeDefined();
  });

  // TODO : fix tests
  // describe("error$", () => {
  //   xit("should execute when contains failure", done => {
  //     const spy = jest.spyOn(service, 'error');
  //     actions = of({ type: 'test Failure' });
  //
  //     effects.error$.subscribe(() => {
  //       expect(spy).toHaveBeenCalledTimes(1);
  //       done();
  //     });
  //   });
  //
  //   xit("should not execute when not contains failure", async done => {
  //     const spy = jest.spyOn(service, 'error');
  //     actions = of({ type: 'test Success' });
  //
  //     //  ?
  //     effects.error$.subscribe(() => {});
  //
  //     expect(spy).toHaveBeenCalledTimes(0);
  //     done();
  //   });
  // });
});
