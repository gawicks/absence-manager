import { createReducer } from "@reduxjs/toolkit";
import { absencesError, absencesLoaded } from "./actions";
import { State } from "./types";

const initialState: State = {
  absences: {},
};

const absenceReducer = createReducer(initialState, (builder) => {
  builder.addCase(absencesLoaded, (state, action) => {
    const { payload } = action;
    const filterStr = payload.filter.key;
    return {
      ...state,
      absences: {
        ...state.absences,
        [filterStr]: {
          ...state.absences[filterStr],
          count: payload.count,
          [payload.page]: {
            data: payload.absences,
            hasError: false,
          },
        },
      },
    };
  });
  builder.addCase(absencesError, (state, action) => {
    const { payload } = action;
    const filterStr = payload.filter.key;
    return {
      ...state,
      absences: {
        ...state.absences,
        [filterStr]: {
          ...state.absences[filterStr],
          [payload.page]: {
            data: null,
            hasError: true,
          },
        },
      },
    };
  });
});

export default absenceReducer;
