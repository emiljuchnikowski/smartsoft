import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {IStream} from "@smartsoft001/stream-shell-dtos";

import {StreamConfig} from "../../stream.config";

@Injectable()
export class StreamProvider {
    constructor(private http: HttpClient, private config: StreamConfig) {
    }



    getById(id: string): Observable<IStream> {
        return this.http.get<IStream>(this.config.apiUrl + '/' + id);
    }
}
