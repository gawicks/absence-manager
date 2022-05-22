import thunk from "redux-thunk";
import {
  createAsyncThunk,
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";
import { absenceService, errorService } from "../services/serviceProviders";

import Filter from "../models/filter";
import { IAbsence, IAbsenceResponse } from "../models/types";
import { State } from "./types";

export type Params = {
  page: number;
  filter: Filter;
};

export type AbsencePage = {
  page: number;
  filter: Filter;
  absences: IAbsence[];
  count: number;
};

export const fetchAbsences = createAsyncThunk<AbsencePage, Params>(
  "fetchAbsences",
  async ({ page, filter }, thunkAPI) => {
    const state = thunkAPI.getState() as State;
    const filterKey = filter.key;
    const absenceState: IAbsenceResponse[] | null =
      state.absences?.[filterKey]?.[page]?.data;
    if (absenceState) {
      return {
        page,
        absences: absenceState,
        count: absenceState.length,
        filter,
      };
    }
    try {
      const [absences, count] = await absenceService.getAbsencePage(
        page,
        filter
      );
      return { page, absences, count, filter };
    } catch (error) {
      errorService.error("Absences failed to load");
      return thunkAPI.rejectWithValue({
        page,
        absences: null,
        count: 0,
        filter,
      });
    }
  }
);

export const absencesSlice = createSlice({
  name: "absences",
  initialState: { absences: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbsences.fulfilled, (state: State, action) => {
        const { filter, count, absences, page } = action.payload as AbsencePage;
        // eslint-disable-next-line no-param-reassign
        state.absences[filter.key] = {
          count,
          [page]: {
            data: absences,
            hasError: false,
          },
        };
      })
      .addCase(fetchAbsences.rejected, (state: State, action) => {
        const { filter, count, page } = action.payload as AbsencePage;
        // eslint-disable-next-line no-param-reassign
        state.absences[filter.key] = {
          count,
          [page]: {
            data: null,
            hasError: true,
          },
        };
      });
  },
});

export const store = configureStore({
  reducer: absencesSlice.reducer,
  // Use extraArgument to inject services into thunks.
  middleware: [thunk.withExtraArgument({ absenceService, errorService })],
});
