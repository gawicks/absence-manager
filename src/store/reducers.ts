import { AnyAction } from "redux";
import { ABSENCES_ERROR, ABSENCES_LOADED } from "./actions";
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
    case ABSENCES_ERROR:
      return state;
    default:
      return state;
  }
};

export default absenceReducer;
