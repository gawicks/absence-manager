import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import { absenceService, errorService } from "./services/serviceProviders";
import { ServiceContext } from "./context";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

// eslint-disable-next-line react/jsx-no-constructed-context-values
const serviceProviders = { absenceService, errorService };
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <Provider store={store}>
        <ServiceContext.Provider value={serviceProviders}>
          <App />
        </ServiceContext.Provider>
      </Provider>
    </CssBaseline>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
