import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Filter from "../models/filter";
import { IAbsence, IAbsenceResponse } from "../models/types";
import MockBackend from "../services/mockBackend";
import { absencesError, absencesLoaded } from "./actions";
import { State } from "./types";

const fetchAbsences =
  (page = 0, filter: Filter) =>
  async (
    dispatch: ThunkDispatch<State, MockBackend, AnyAction>,
    getState: () => State,
    backend: MockBackend
  ) => {
    const state = getState();
    const filterKey = filter.key();
    if (state.absences[filterKey]?.[page]?.data) {
      return;
    }
    try {
      const [absenceResponses, count] = await backend.getAbsences(
        page,
        filter.value
      );
      const absences = absenceResponses.map(
        (absenceResponse: IAbsenceResponse) => {
          const absence: IAbsence = { ...absenceResponse };
          if (absence.user) {
            // Flatten
            absence["user.id"] = absence.user.id;
            absence["user.name"] = absence.user.name;
            absence["user.image"] = absence.user.image;
            absence[
              "absence.period"
            ] = `${absence.startDate} - ${absence.endDate}`;
          }
          return absence;
        }
      );
      dispatch(absencesLoaded(page, count, absences, filter));
    } catch (error) {
      dispatch(absencesError(page, filter, error as Error));
    }
  };

export default fetchAbsences;
