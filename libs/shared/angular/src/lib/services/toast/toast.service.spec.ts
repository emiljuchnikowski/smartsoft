import "jest-preset-angular";

import { TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ToastService } from "./toast.service";

describe("ToastService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
      imports: [IonicModule.forRoot()]
    });
  });

  it("should be created", () => {
    const service: ToastService = TestBed.get(ToastService);
    expect(service).toBeTruthy();
  });
});
