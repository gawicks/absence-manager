import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import React from "react";
import ErrorService from "../../services/errorService";
import MockBackend from "../../services/mockBackend";
import absenceReducer from "../../store/reducers";
import testData from "./App.test.json";
import App from "./App";
import { VirtualizationContext, ServiceContext } from "../../context";

describe("Absence Page", () => {
  describe("Grid", () => {
    const backend = new MockBackend();
    const errorService = new ErrorService();
    let store: Store;
    let container: HTMLElement;
    beforeEach(async () => {
      jest
        .spyOn(backend, "getAbsences")
        .mockResolvedValue([
          [testData.AbsenceTypeSickness, testData.AbsenceTypeVacation],
          2,
        ]);

      jest.spyOn(errorService, "error").mockImplementation(() => {
        // do nothing
      });

      store = createStore(
        absenceReducer,
        applyMiddleware(thunk.withExtraArgument({ backend, errorService }))
      );
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      const serviceContext = { errorService };
      ({ container } = render(
        <Provider store={store}>
          <VirtualizationContext.Provider value={false}>
            <ServiceContext.Provider value={serviceContext}>
              <App />
            </ServiceContext.Provider>
          </VirtualizationContext.Provider>
        </Provider>
      ));
      await waitFor(() => expect(backend.getAbsences).toHaveBeenCalledTimes(1));
    });
    it("Should display columns", async () => {
      const columns = screen.queryAllByRole("columnheader");
      expect(columns).toHaveLength(6);
      expect(screen.getByText("Member name")).toBeInTheDocument();
      expect(screen.getByText("Type of absence")).toBeInTheDocument();
      expect(screen.getByText("Period")).toBeInTheDocument();
      expect(screen.getByText("Member note")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Admitter note")).toBeInTheDocument();
    });
    it("Should display absence rows", async () => {
      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(3);
    });
    it("Should display admitter notes", async () => {
      expect(screen.getByText("Test note")).toBeInTheDocument();
      expect(screen.getByText("Test note 2")).toBeInTheDocument();
    });
    it("Should display filter options", async () => {
      const menu = container.querySelector(
        "[role=columnheader][data-field=type] [title=Menu]"
      ) as HTMLElement;
      fireEvent.click(menu);
      fireEvent.click(screen.getByText("Filter"));
      const select = await screen.findByPlaceholderText("Filter value");
      fireEvent.click(select);

      expect(within(select).getByText("vacation")).toBeVisible();
      expect(within(select).getByText("sickness")).toBeVisible();
      expect(within(select).getByText("other")).toBeVisible();
    });
  });
});
