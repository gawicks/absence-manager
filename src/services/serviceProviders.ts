import ErrorService from "./errorService";
import MockBackend from "./mockBackend";

const backend = new MockBackend({ simulatedDelay: 500 });
const errorService = new ErrorService();

export { backend, errorService };
