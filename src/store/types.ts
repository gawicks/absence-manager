import { IAbsenceResponse } from "../models/types";

export type State = {
  absences: {
    [filter: string]: {
      count: number;
      [page: number]: {
        data: IAbsenceResponse[];
        hasError: boolean;
      };
    };
  };
};
