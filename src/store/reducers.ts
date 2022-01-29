import { AnyAction } from "redux";
import { IAbsence } from "../models/common.interfaces";
import { ABSENCES_ERROR, ABSENCES_LOADED, FETCH_ABSENCES } from "./actions";

const initialState: {
  absences: {
    [filter: string]: {
      [page: string]: {
        data: IAbsence[];
        hasError: boolean;
      };
    };
  };
} = {
  absences: {},
};

const absenceReducer = (state = initialState, action: AnyAction) => {
  const filterStr = action.data.filter.key();
  switch (action.type) {
    case ABSENCES_LOADED:
      return {
        ...state,
        absences: {
          ...state.absences,
          [filterStr]: {
            ...state.absences[filterStr],
            count: action.data.count,
            [action.data.page]: {
              error: null,
              data: action.data.absences,
            },
          },
        },
      };
    case ABSENCES_ERROR:
    case FETCH_ABSENCES:
    default:
      return state;
  }
};
export default absenceReducer;
