interface IFilterItem {
  columnField?: string;
  value?: string;
}

export interface IFilterValue {
  items?: IFilterItem[];
}

export interface IFilter {
  key: string;
  isEmpty: boolean;
  isEqual: (filter: IFilter) => boolean;
}

export interface IUserResponse {
  crewId: number;
  id: number;
  image: string;
  name: string;
  userId: number;
}

export interface IAbsenceResponse {
  admitterId: number | null;
  admitterNote: string;
  confirmedAt: string | null;
  createdAt: string | null;
  crewId: number;
  endDate: string;
  id: number;
  memberNote: string;
  rejectedAt: string | null;
  startDate: string;
  type: string;
  userId: number;
  user?: IUserResponse;
}

export interface IAbsence extends IAbsenceResponse {
  "absence.period"?: string;
  "user.id"?: number;
  "user.name"?: string;
  "user.image"?: string;
}

export interface IBackend {
  getAbsences(
    pageNum?: number,
    filter?: IFilterValue
  ): Promise<[IAbsenceResponse[], number]>;
}

export interface IAbsenceService {
  getAbsencePage(
    pageNum?: number,
    filter?: IFilter
  ): Promise<[IAbsenceResponse[], number]>;
  getAllAbsences(filter?: IFilter): Promise<[IAbsenceResponse[], number]>;
}

export interface IErrorService {
  error(message: string): void;
}
