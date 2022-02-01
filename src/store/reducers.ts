import { createReducer } from "@reduxjs/toolkit";
import { absencesError, absencesLoaded } from "./actions";
import { State } from "./types";

const initialState: State = {
  absences: {},
};

/**
 * Absences are sliced up by filters and then by page.
 * e.g.
 *   absences: {
    "": {
      1 : [{ start: end: ...}, ..., ...],
      2 : [{ start: end: ...}, ..., ...],
      3 : [{ start: end: ...}, ..., ...],
      ...
    },
    "type=='vacation": {
      1 : [{ start: end: ...}, ..., ...],
      2 : [{ start: end: ...}, ..., ...],
      ...
    },
    "type=='sickness": {
      1 : [{ start: end: ...}, ..., ...],
      2 : [{ start: end: ...}, ..., ...],
      ...
    }
  },
 */
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
