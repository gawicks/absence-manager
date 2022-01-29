import { IAbsence } from "../models/common.interfaces";
import Filter from "../models/filter";

export const ABSENCES_LOADED = "ABSENCES_LOADED";
export const ABSENCES_ERROR = "ABSENCES_ERROR";
export const FETCH_ABSENCES = "FETCH_ABSENCES";

export function absencesLoaded(
  page: number,
  count: number,
  absences: IAbsence[],
  filter: Filter
) {
  return {
    type: ABSENCES_LOADED,
    data: { page, count, absences, filter },
  };
}

export function absencesError(page: number, filter: Filter, error: Error) {
  return {
    type: ABSENCES_ERROR,
    data: { page, filter, error },
  };
}

export function fetchAbsences(page: number, filter: Filter) {
  return {
    type: FETCH_ABSENCES,
    data: { page, filter },
  };
}
