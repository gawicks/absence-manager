import { createAction } from "@reduxjs/toolkit";
import {
  ABSENCES_ERROR,
  ABSENCES_LOADED,
  IAbsenceErrorPayload,
  IAbsenceLoadedPayload,
} from "./types";

const absencesLoaded = createAction<IAbsenceLoadedPayload>(ABSENCES_LOADED);
const absencesError = createAction<IAbsenceErrorPayload>(ABSENCES_ERROR);

export { absencesLoaded, absencesError };
