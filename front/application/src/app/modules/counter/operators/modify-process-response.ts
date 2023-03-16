import { map, Observable } from "rxjs";
import { ProcessResponse } from "../interfaces/process-response.interface";
import { ModifiedProcessResponse } from "../interfaces/modified-process-response.interface";

/**
 * Преобразовать ответ от сервера на запрос Process
 * @param startAt
 */
export function modifyProcessResponse(startAt: Date) {
  return (source: Observable<ProcessResponse>): Observable<ModifiedProcessResponse|null> => {
    return source.pipe(
      map(res => {
        if (res === null) {
          return null;
        }
        return {
          startAt,
          ...res,
        }
      }),
    )
  }
}
