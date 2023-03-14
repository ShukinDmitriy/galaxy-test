import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { catchError, Observable, of } from "rxjs";
import { GetParamsResponse } from "../interfaces/get-params-response.interface";
import { ProcessResponse } from "../interfaces/process-response.interface";

@Injectable()
export class CounterService {

  protected readonly getParamsUrl = environment.apiBaseUrl;
  protected readonly processUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Запросить текущие параметры сервера
   */
  getParams(): Observable<GetParamsResponse|null> {
    return this.http.post<GetParamsResponse>(this.getParamsUrl, {
      "action": "params"
    })
      .pipe(
        catchError(err => of(null)),
      );
  }

  /**
   * Отправить запрос на выполнение
   */
  process(): Observable<ProcessResponse|null> {
    return this.http.post<ProcessResponse>(this.processUrl, {
      "action": "process"
    })
      .pipe(
        catchError(err => of(null)),
      );
  }
}
