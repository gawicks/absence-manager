import AbsenceService from "./absenceService";
import ErrorService from "./errorService";
import MockBackend from "./mockBackend";

const backend = new MockBackend({ simulatedDelay: 500 });
const absenceService = new AbsenceService(backend);
const errorService = new ErrorService();

export { absenceService, errorService };
