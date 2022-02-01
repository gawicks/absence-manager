import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { absenceService, errorService } from "../services/serviceProviders";
import absenceReducer from "./reducers";

const store = configureStore({
  reducer: absenceReducer,
  // Use extraArgument to inject services into thunks.
  middleware: [thunk.withExtraArgument({ absenceService, errorService })],
});

export default store;
