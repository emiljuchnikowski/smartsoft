import { Injectable } from '@angular/core';

import {ToastService} from "../toast/toast.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class ErrorService {

  constructor(private toastService: ToastService, private translateService: TranslateService) { }

  async log(obj): Promise<void> {
    let message = '';

    if (obj instanceof HttpErrorResponse) {
      if (obj.error.details === 'Invalid username or password') {
        message = await  this.translateService.get('ERRORS.invalidUsernameOrPassword').toPromise();
      }
    }

    if (!message)
      message = await  this.translateService.get('ERRORS.other').toPromise();

    await this.toastService.error({message});
  }
}
