import { IAbsenceResponse, IBackend, IFilterValue } from "../models/types";
import absences from "./absences.json";
import members from "./members.json";

/**
 * Mockback which simulates a real backend.
 * Supports simulating latency, errors.
 */
export default class MockBackend implements IBackend {
  constructor(
    private config: { simulatedLatency?: number; simulateError?: true } = {}
  ) {}

  public getAbsences(
    pageNum: number | undefined,
    filter: IFilterValue = {}
  ): Promise<[IAbsenceResponse[], number]> {
    if (pageNum != null && pageNum < 0) {
      return Promise.reject(new Error("Invalid page number"));
    }
    if (this.config.simulateError) {
      return Promise.reject(new Error("Unkown error"));
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

                // Filter absences filterDate is with range of.
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

    if (this.config.simulatedLatency) {
      return new Promise((resolve) => {
        setTimeout(() => resolve([page, count]), this.config.simulatedLatency);
      });
    }
    return Promise.resolve([page, count]);
  }
}
