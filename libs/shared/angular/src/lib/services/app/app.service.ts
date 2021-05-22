import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

import {ArrayService} from "@smartsoft001/utils";

import {IIconButtonOptions} from "../../models/interfaces";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private _endButtonsSource$ = new BehaviorSubject<IIconButtonOptions[]>([]);

    endButtons$ = this._endButtonsSource$.asObservable();

    addEndButton(button: IIconButtonOptions): void {
        this._endButtonsSource$.next(ArrayService.addItem(this._endButtonsSource$.value, button));
    }

    removeEndButton(button: IIconButtonOptions): void {
        this._endButtonsSource$.next(ArrayService.removeItem(this._endButtonsSource$.value, button));
    }
}