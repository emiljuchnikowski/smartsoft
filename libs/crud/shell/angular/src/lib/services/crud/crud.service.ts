import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { IEntity } from "@smartsoft001/domain-core";
import { CrudConfig } from "../../crud.config";
import {map} from "rxjs/operators";

@Injectable()
export class CrudService<T extends IEntity<string>> {
  constructor(private config: CrudConfig<T>, private http: HttpClient) {}

  // TODO : Location is null
  create(item: T): Observable<string> {
    return this.http.post<void>(this.config.apiUrl, item, { observe: 'response' }).pipe(
        map(response => {
          const location = response.headers['Location'];
          if (!location) return null;
          const array = location.split('/');
          return array[array.length - 1];
        })
    );
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(this.config.apiUrl + "/" + id);
  }

  getList<F>(
    filter: F
  ): Observable<{ data: T[]; totalCount: number; links }> {
    return this.http.get<{ data: T[]; totalCount: number; links }>(
      this.config.apiUrl + (filter ? "?" + filter : "")
    );
  }

  update(item: T): Observable<void> {
    return this.http.put<void>(this.config.apiUrl + "/" + item.id, item);
  }

  updatePartial(item: Partial<T> & { id: string }): Observable<void> {
    return this.http.patch<void>(this.config.apiUrl + "/" + item.id, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.config.apiUrl + "/" + id);
  }
}
