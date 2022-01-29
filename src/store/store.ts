import { createStore } from "redux";
import { IAbsence, IAbsenceResponse } from "../models/types";
import Filter from "../models/filter";
import MockBackend from "../services/mockBackend";
import { absencesLoaded } from "./actions";
// eslint-disable-next-line import/no-cycle
import absenceReducer from "./reducers";

const store = createStore(absenceReducer);
export default store;

const backend = new MockBackend();

export async function fetchAbsences(page = 0, filter: Filter) {
  const [absenceResponses, count] = await backend.getAbsences(
    page,
    filter.value
  );
  const absences = absenceResponses.map((absenceResponse: IAbsenceResponse) => {
    const absence: IAbsence = { ...absenceResponse };
    if (absence.user) {
      // Flatten
      absence["user.id"] = absence.user.id;
      absence["user.name"] = absence.user.name;
      absence["user.image"] = absence.user.image;
      absence["absence.period"] = `${absence.startDate} - ${absence.endDate}`;
    }
    return absence;
  });
  store.dispatch(absencesLoaded(page, count, absences, filter));
}
