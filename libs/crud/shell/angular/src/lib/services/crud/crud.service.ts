import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { IEntity } from "@smartsoft001/domain-core";
import { CrudConfig } from "../../crud.config";
import { ICrudFilter } from "../../models/interfaces";

@Injectable()
export class CrudService<T extends IEntity<string>> {
  constructor(private config: CrudConfig<T>, private http: HttpClient) {}

  // TODO : Location is null
  create(item: T): Observable<string> {
    return this.http
      .post<void>(this.config.apiUrl, item, { observe: "response" })
      .pipe(
        map(response => {
          const location = response.headers["Location"];
          if (!location) return null;
          const array = location.split("/");
          return array[array.length - 1];
        })
      );
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(this.config.apiUrl + "/" + id);
  }

  getList(
    filter: ICrudFilter = null
  ): Observable<{ data: T[]; totalCount: number; links }> {
    return this.http.get<{ data: T[]; totalCount: number; links }>(
      this.config.apiUrl + this.getQuery(filter)
    );
  }

  exportList(
      filter: ICrudFilter = null
  ): Observable<void> {
    return this.http.get<string>(
        this.config.apiUrl + this.getQuery(filter),
        {
          headers: {
            'Content-Type': 'text/csv'
          },
          responseType: 'text' as 'json'
        }
    ).pipe(
        map(res => {
          window.open("data:text/csv;charset=utf-8," + escape(res));
        })
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

  private getQuery(filter: ICrudFilter): string {
    let query = '';

    if (filter && filter.searchText) {
      query += '&$search=' + filter.searchText;
    }

    if (filter && filter.limit) {
      query += `&limit=${filter.limit}&offset=${filter.offset ? filter.offset : 0}`;
    }

    if (filter && filter.sortBy) {
      query += `&sort=${ (filter.sortDesc ? '-' : '') + filter.sortBy}`;
    }

    if (filter && filter.query) {
      filter.query.forEach(q => {
        query += '&' + q.key + q.type + q.value;
      });
    }

    return (query ? "?" + query.replace('&', '') : "");
  }
}
