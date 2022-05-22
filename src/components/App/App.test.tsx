import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import ErrorService from "../../services/errorService";
import MockBackend from "../../services/mockBackend";
import testData from "./App.test.json";
import App from "./App";
import { VirtualizationContext, ServiceContext } from "../../context";
import { IAbsenceResponse } from "../../models/types";
import AbsenceService from "../../services/absenceService";
import { absencesSlice } from "../../store/store";

async function setupMocks(
  mockGetAbsences: () => Promise<[IAbsenceResponse[], number]>,
  mockErrorHandler: () => void
): Promise<HTMLElement> {
  const backend = new MockBackend();
  const absenceService = new AbsenceService(backend);
  const errorService = new ErrorService();
  jest.spyOn(backend, "getAbsences").mockImplementation(mockGetAbsences);
  jest.spyOn(errorService, "error").mockImplementation(mockErrorHandler);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const services = { absenceService, errorService };

  const store = configureStore({
    reducer: absencesSlice.reducer,
    middleware: [thunk.withExtraArgument({ absenceService, errorService })],
  });

  const { container } = render(
    <Provider store={store}>
      <VirtualizationContext.Provider value={false}>
        <ServiceContext.Provider value={services}>
          <App />
        </ServiceContext.Provider>
      </VirtualizationContext.Provider>
    </Provider>
  );
  await waitFor(() => expect(backend.getAbsences).toHaveBeenCalledTimes(1));
  return container;
}
describe("Absence Page", () => {
  describe("Heading", () => {
    beforeEach(async () => {
      const mockGetAbsences = () => {
        const ret: [IAbsenceResponse[], number] = [[], 0];
        return Promise.resolve(ret);
      };
      const mockErrorHandler = () => {
        /* do nothing */
      };
      await setupMocks(mockGetAbsences, mockErrorHandler);
    });
    it("Should display the title", async () => {
      expect(screen.getByText("Absence Manager")).toBeInTheDocument();
    });
  });
  describe("Grid", () => {
    let container: HTMLElement;
    beforeEach(async () => {
      const mockGetAbsences = () => {
        const ret: [IAbsenceResponse[], number] = [
          [testData.AbsenceTypeSickness, testData.AbsenceTypeVacation],
          2,
        ];
        return Promise.resolve(ret);
      };
      const mockErrorHandler = () => {
        /* do nothing */
      };
      container = await setupMocks(mockGetAbsences, mockErrorHandler);
    });
    it("Should display columns", async () => {
      const columns = screen.queryAllByRole("columnheader");
      expect(columns).toHaveLength(7);
      expect(screen.getByText("Member name")).toBeInTheDocument();
      expect(screen.getByText("Type of absence")).toBeInTheDocument();
      expect(screen.getByText("Period")).toBeInTheDocument();
      expect(screen.getByText("Member note")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Admitter note")).toBeInTheDocument();
    });
    it("Should display absence rows", async () => {
      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(3); // 1 header row + 2 data rows.
    });
    it("Should display admitter notes", async () => {
      expect(screen.getByText("Test note")).toBeInTheDocument();
      expect(screen.getByText("Test note 2")).toBeInTheDocument();
    });
    it("Should display filter options", async () => {
      const menu = container.querySelector(
        "[role=columnheader][data-field=type] [title=Menu]"
      ) as HTMLElement; // Not possible to query this element with the screen API.
      fireEvent.click(menu);
      fireEvent.click(screen.getByText("Filter"));
      const select = await screen.findByPlaceholderText("Filter value");
      fireEvent.click(select);

      expect(within(select).getByText("vacation")).toBeVisible();
      expect(within(select).getByText("sickness")).toBeVisible();
      expect(within(select).getByText("other")).toBeVisible();
    });
  });
  describe("Grid Empty", () => {
    beforeEach(async () => {
      const mockGetAbsences = () => {
        const ret: [IAbsenceResponse[], number] = [[], 0];
        return Promise.resolve(ret);
      };
      const mockErrorHandler = () => {
        /* do nothing */
      };
      await setupMocks(mockGetAbsences, mockErrorHandler);
    });
    it("Should display an empty state if results empty", async () => {
      expect(screen.getByText("No rows")).toBeInTheDocument();
    });
  });
  describe("Grid Error", () => {
    beforeEach(async () => {
      const mockGetAbsences = () => {
        return Promise.reject(new Error());
      };
      const mockErrorHandler = () => {
        /* do nothing */
      };
      await setupMocks(mockGetAbsences, mockErrorHandler);
    });
    it("Should display an error state if results unavailable", async () => {
      expect(screen.getByText("An error occurred.")).toBeInTheDocument();
    });
  });
});
