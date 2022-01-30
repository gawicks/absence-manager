import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { backend, errorService } from "../services/serviceProviders";
import absenceReducer from "./reducers";

const store = createStore(
  absenceReducer,
  applyMiddleware(thunk.withExtraArgument({ backend, errorService }))
);
export default store;
