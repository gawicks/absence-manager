interface FilterItem {
  columnField: string;
  value: string;
}

export interface Filter {
  items: FilterItem[];
}

export interface User {
  crewId: number;
  id: number;
  image: string;
  name: string;
  userId: number;
}

export interface Absence {
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
  user?: User;
}
