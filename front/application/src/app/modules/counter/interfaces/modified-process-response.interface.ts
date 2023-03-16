import { ProcessResponse } from "./process-response.interface";

export interface ModifiedProcessResponse extends ProcessResponse {
  startAt: Date;
}
