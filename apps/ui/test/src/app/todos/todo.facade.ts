import {Injectable} from "@angular/core";
import {ReduxAction} from "@smartsoft001/angular";
import {Observable, of} from "rxjs";

@Injectable()
export class TodoFacade {
    @ReduxAction()
    do(): Observable<any> {
        return Service.do();
    }
}

export class Service {
    static do(): Observable<any> {
        const test = {
            name: 'test'
        };

        console.log('test');

        return of(test);
    }
}