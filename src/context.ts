import React from "react";
import { absenceService, errorService } from "./services/serviceProviders";

// Add ServiceProviders to ServiceContext.
const ServiceContext = React.createContext({ absenceService, errorService });
// Used to disable column virtualization for tests. See AbsenceGrid.
const VirtualizationContext = React.createContext(true);

export { ServiceContext, VirtualizationContext };
