import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Filter from "../models/filter";
import { IAbsenceService, IErrorService } from "../models/types";
import { absencesError, absencesLoaded } from "./actions";
import { State } from "./types";

type ServiceProviders = {
  absenceService: IAbsenceService;
  errorService: IErrorService;
};

const fetchAbsences =
  (page = 0, filter: Filter) =>
  async (
    dispatch: ThunkDispatch<State, ServiceProviders, AnyAction>,
    getState: () => State,
    { absenceService, errorService }: ServiceProviders
  ) => {
    const state = getState();
    const filterKey = filter.key;
    if (state.absences[filterKey]?.[page]?.data) {
      return;
    }
    try {
      const [absences, count] = await absenceService.getAbsencePage(
        page,
        filter
      );
      dispatch(absencesLoaded({ page, absences, count, filter }));
    } catch (error) {
      errorService.error("Absences failed to load");
      dispatch(absencesError({ page, filter, error: error as Error }));
    }
  };

export default fetchAbsences;
