import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";

@Injectable()
export class NgrxStoreService {
    static store: Store<any> | undefined = undefined;
    connect(store: Store<any>) {
        NgrxStoreService.store = store;
    }
}
