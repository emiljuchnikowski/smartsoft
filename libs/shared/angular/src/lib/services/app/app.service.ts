import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

import {ArrayService} from "@smartsoft001/utils";

import {IIconButtonOptions} from "../../models/interfaces";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private static _endButtonsSource$ = new BehaviorSubject<AppEndButton[]>([]);

    endButtons$ = AppService._endButtonsSource$.asObservable();

    addEndButton(button: AppEndButton): void {
        if (button.id) {
            const exist = AppService._endButtonsSource$.value.filter(e => e.id === button.id);

            if (exist) {
                Object.keys(button).filter(k => k !== 'id').forEach(key => {
                    exist[key] = button[key];
                })
                AppService._endButtonsSource$.next([ ...AppService._endButtonsSource$.value ]);
                return;
            }
        }
        AppService._endButtonsSource$.next(ArrayService.addItem(AppService._endButtonsSource$.value, button));
    }

    removeEndButton(buttonOrId: AppEndButton | string): void {
        if (typeof buttonOrId === 'object') {
            const button = (buttonOrId as AppEndButton).id ?
                AppService._endButtonsSource$.value.find(e => e.id === (buttonOrId as AppEndButton).id)
                : (buttonOrId as AppEndButton)

            AppService._endButtonsSource$.next(ArrayService.removeItem(AppService._endButtonsSource$.value, button));
            return;
        }


        AppService._endButtonsSource$.next([
            ...AppService._endButtonsSource$.value.filter(e => e.id !== (buttonOrId as string))
        ]);
    }
}

export type AppEndButton = IIconButtonOptions & { id?: string } ;