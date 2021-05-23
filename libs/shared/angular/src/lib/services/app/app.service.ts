import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

import {ArrayService} from "@smartsoft001/utils";

import {IIconButtonOptions} from "../../models/interfaces";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private _endButtonsSource$ = new BehaviorSubject<AppEndButton[]>([]);

    endButtons$ = this._endButtonsSource$.asObservable();

    addEndButton(button: AppEndButton): void {
        if (button.id) {
            const exist = this._endButtonsSource$.value.filter(e => e.id === button.id);

            if (exist) {
                Object.keys(button).filter(k => k !== 'id').forEach(key => {
                    exist[key] = button[key];
                })
                this._endButtonsSource$.next([ ...this._endButtonsSource$.value ]);
                return;
            }
        }
        this._endButtonsSource$.next(ArrayService.addItem(this._endButtonsSource$.value, button));
    }

    removeEndButton(buttonOrId: AppEndButton | string): void {
        if (typeof buttonOrId === 'object') {
            const button = (buttonOrId as AppEndButton).id ?
                this._endButtonsSource$.value.find(e => e.id === (buttonOrId as AppEndButton).id)
                : (buttonOrId as AppEndButton)

            this._endButtonsSource$.next(ArrayService.removeItem(this._endButtonsSource$.value, button));
            return;
        }


        this._endButtonsSource$.next([
            ...this._endButtonsSource$.value.filter(e => e.id !== (buttonOrId as string))
        ]);
    }
}

export type AppEndButton = IIconButtonOptions & { id?: string } ;