import {Injectable} from "@angular/core";
import {ReduxAction} from "@smartsoft001/angular";
import {Observable, of} from "rxjs";

@Injectable()
export class UserService {
    @ReduxAction()
    log1(): number {
        return 12;
    }

    @ReduxAction()
    log2(): Promise<number> {
        return Promise.resolve(22);
    }

    @ReduxAction()
    log3(arg: number, arg2: Date): Observable<any> {
        return of({arg, arg2});
    }
}
