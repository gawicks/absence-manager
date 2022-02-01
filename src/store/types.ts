import { IAbsence, IAbsenceResponse, IFilter } from "../models/types";

export const ABSENCES_LOADED = "ABSENCES_LOADED";
export const ABSENCES_ERROR = "ABSENCES_ERROR";
export const FETCH_ABSENCES = "FETCH_ABSENCES";

export type State = {
  absences: {
    [filter: string]: {
      count: number;
      [page: number]: {
        data: IAbsenceResponse[] | null;
        hasError: boolean;
      };
    };
  };
};

export interface IAbsenceErrorPayload {
  page: number;
  filter: IFilter;
  error: Error;
}

export interface IAbsenceLoadedPayload {
  page: number;
  count: number;
  absences: IAbsence[];
  filter: IFilter;
}
