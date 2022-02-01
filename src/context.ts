import React from "react";
import { absenceService, errorService } from "./services/serviceProviders";

const ServiceContext = React.createContext({ absenceService, errorService });
const VirtualizationContext = React.createContext(true);

export { ServiceContext, VirtualizationContext };
