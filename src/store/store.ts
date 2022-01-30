import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import MockBackend from "../services/mockBackend";
import absenceReducer from "./reducers";

const backend = new MockBackend();

const store = createStore(
  absenceReducer,
  applyMiddleware(thunk.withExtraArgument(backend))
);
export default store;
