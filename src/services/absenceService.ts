import Filter from "../models/filter";
import {
  AbsenceStatus,
  IAbsence,
  IAbsenceResponse,
  IAbsenceService,
  IBackend,
} from "../models/types";

/**
 * Service which pull absences, user info from backend,
 * and flattens them into a format consumable by the client.
 */
export default class AbsenceService implements IAbsenceService {
  constructor(private backend: IBackend) {}

  public async getAbsencePage(
    page = 0,
    filter: Filter
  ): Promise<[IAbsence[], number]> {
    return this.backend
      .getAbsences(page, filter.value)
      .then(([absenceResponses, count]) => {
        const absences = AbsenceService.mapAbsenceResponse(absenceResponses);
        return [absences, count];
      });
  }

  public async getAllAbsences(filter: Filter): Promise<[IAbsence[], number]> {
    return this.backend
      .getAbsences(undefined, filter.value)
      .then(([absenceResponses, count]) => {
        const absences = AbsenceService.mapAbsenceResponse(absenceResponses);
        return [absences, count];
      });
  }

  private static mapAbsenceResponse(absenceResponses: IAbsenceResponse[]) {
    const absences = absenceResponses.map((absenceResponse) => {
      const absence: IAbsence = { ...absenceResponse };
      if (absence.user) {
        // Flatten
        absence.period = `${absence.startDate} - ${absence.endDate}`;
        absence["user.id"] = absence.user.id;
        absence["user.name"] = absence.user.name;
        absence["user.image"] = absence.user.image;

        if (absence.confirmedAt != null) {
          absence.status = AbsenceStatus.Confirmed;
        } else if (absence.rejectedAt != null) {
          absence.status = AbsenceStatus.Rejected;
        } else {
          absence.status = AbsenceStatus.Requested;
        }
      }
      return absence;
    });
    return absences;
  }
}
