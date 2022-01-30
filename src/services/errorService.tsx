import React from "react";
import { render } from "react-dom";
import ErrorSnackbar from "../components/ErrorSnackbar";

export default class ErrorService {
  private key = 0;

  private inc() {
    this.key += 1;
    return this.key;
  }

  public error(message: string) {
    return render(
      <ErrorSnackbar key={this.inc()} {...{ message }} />,
      document.getElementById("popup-root")
    );
  }
}
