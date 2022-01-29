import { AnyAction } from "redux";
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
  switch (action.type) {
    case ABSENCES_LOADED:
    case ABSENCES_ERROR:
    case FETCH_ABSENCES:
    default:
      return state;
  }
};
export default absenceReducer;
