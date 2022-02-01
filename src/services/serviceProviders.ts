import AbsenceService from "./absenceService";
import ErrorService from "./errorService";
import MockBackend from "./mockBackend";

/*
 * Add additional services to be provided at the root of the application here.
 */
const backend = new MockBackend({ simulatedLatency: 500 });
const absenceService = new AbsenceService(backend);
const errorService = new ErrorService();

export { absenceService, errorService };
