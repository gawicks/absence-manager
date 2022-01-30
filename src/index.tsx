import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import { errorService } from "./services/serviceProviders";
import { ServiceContext } from "./context";

// eslint-disable-next-line react/jsx-no-constructed-context-values
const serviceProviders = { errorService };
ReactDOM.render(
  <Provider store={store}>
    <ServiceContext.Provider value={serviceProviders}>
      <App />
    </ServiceContext.Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
