import { AnyAction } from "redux";
import { ABSENCES_ERROR, ABSENCES_LOADED, FETCH_ABSENCES } from "./actions";
// eslint-disable-next-line import/no-cycle
import { fetchAbsences } from "./store";
import { State } from "./types";

const initialState: State = {
  absences: {},
};

const absenceReducer = (state = initialState, action: AnyAction) => {
  let filterStr: string;
  switch (action.type) {
    case ABSENCES_LOADED:
      filterStr = action.data.filter.key();
      return {
        ...state,
        absences: {
          ...state.absences,
          [filterStr]: {
            ...state.absences[filterStr],
            count: action.data.count,
            [action.data.page]: {
              data: action.data.absences,
              hasError: false,
            },
          },
        },
      };
    case FETCH_ABSENCES:
      // TODO: Move to thunk
      fetchAbsences(action.data.page, action.data.filter);
      return state;
    case ABSENCES_ERROR:
      return state;
    default:
      return state;
  }
};

export default absenceReducer;
