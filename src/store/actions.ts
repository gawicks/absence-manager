import { IAbsence, IFilter } from "../models/common.interfaces";

export const ABSENCES_LOADED = "ABSENCES_LOADED";
export const ABSENCES_ERROR = "ABSENCES_ERROR";
export const FETCH_ABSENCES = "FETCH_ABSENCES";

export function absencesLoaded(
  page: number,
  count: number,
  absences: IAbsence[],
  filter: IFilter
) {
  return {
    type: ABSENCES_LOADED,
    data: { page, count, absences, filter },
  };
}

export function absencesError(page: number, filter: IFilter, error: Error) {
  return {
    type: ABSENCES_ERROR,
    data: { page, filter, error },
  };
}