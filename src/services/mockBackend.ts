import { IAbsenceResponse, IBackend, IFilterValue } from "../models/types";
import absences from "./absences.json";
import members from "./members.json";

export default class MockBackend implements IBackend {
  constructor(private config: { simulatedDelay?: number } = {}) {}

  public getAbsences(
    pageNum: number | undefined,
    filter: IFilterValue = {}
  ): Promise<[IAbsenceResponse[], number]> {
    if (pageNum && pageNum < 0) {
      return Promise.reject(new Error("Invalid page number"));
    }
    let { payload }: { payload: IAbsenceResponse[] } = absences;
    // Filter
    if (filter && filter.items) {
      filter.items.forEach((item) => {
        switch (item.columnField) {
          case "period":
            payload = payload.filter((absence) => {
              if (item.value) {
                const startDate = Date.parse(absence.startDate);
                const endDate = Date.parse(absence.endDate);
                const filterDate = Date.parse(item.value);

                return filterDate >= startDate && filterDate <= endDate;
              }
              return true;
            });
            break;
          case "type":
            payload = payload.filter((absence) =>
              item.value ? absence.type === item.value : true
            );
            break;
          default:
            break;
        }
      });
    }
    // Paginate
    const count = payload.length;
    let page = pageNum
      ? payload.slice(pageNum * 10, pageNum * 10 + 10)
      : payload;

    // Join
    page = page.map((absence) => {
      const user = members.payload.find(
        (member) => member.userId === absence.userId
      );
      if (user) {
        return { ...absence, user };
      }
      return absence;
    });

    if (this.config.simulatedDelay) {
      return new Promise((resolve) => {
        setTimeout(() => resolve([page, count]), this.config.simulatedDelay);
      });
    }
    return Promise.resolve([page, count]);
  }
}
