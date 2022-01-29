interface IFilterItem {
  columnField: string;
  value: string;
}

export interface IFilter {
  items?: IFilterItem[];
}

export interface IUser {
  crewId: number;
  id: number;
  image: string;
  name: string;
  userId: number;
}

export interface IAbsence {
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
  user?: IUser;
}
