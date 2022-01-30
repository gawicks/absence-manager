import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import ErrorProvider from "./context";
import { errorService } from "./services/serviceProviders";

ReactDOM.render(
  <Provider store={store}>
    <ErrorProvider.Provider value={errorService}>
      <App />
    </ErrorProvider.Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
