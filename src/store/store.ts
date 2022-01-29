import { createStore } from "redux";
import absenceReducer from "./reducers";

const store = createStore(absenceReducer);
export default store;
