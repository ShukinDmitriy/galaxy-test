import { Injectable } from '@angular/core';
import { CounterService } from "./counter.service";
import { Observable } from "rxjs";
import { modifyProcessResponse } from "../operators/modify-process-response";
import { ModifiedProcessResponse } from "../interfaces/modified-process-response.interface";

@Injectable()
export class ProcessService {

  constructor(
    private counterService: CounterService,
  ) {
  }

  /**
   * Отправить запрос на выполнение и преобразовать ответ
   */
  modifiedProcess(): Observable<ModifiedProcessResponse | null> {
    return this.counterService.process()
      .pipe(
        modifyProcessResponse(new Date()),
      );
  }

}
