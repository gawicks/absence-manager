import React, { Fragment, useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../../models/filter";
import { State } from "../../store/types";
import fetchAbsences from "../../store/thunks";
import AbsenceGrid from "../AbsenceGrid";
import styles from "./App.module.scss";
import logo from "./logo_crewmeister_white.svg";
import ImageCell from "../ImageCell/ImageCell";

const columns: GridColDef[] = [
  {
    field: "user.name",
    headerName: "Member name",
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: "user.image",
    headerName: "Profile picture",
    width: 100,
    renderCell: ({ value }) => (
      <ImageCell src={value as string} alt="profile picture" />
    ),
    align: "center",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: "type",
    headerName: "Type of absence",
    type: "singleSelect",
    valueOptions: ["sickness", "vacation", "other"],
    width: 150,
    sortable: false,
  },
  {
    field: "period",
    headerName: "Period",
    type: "date",
    width: 300,
    sortable: false,
  },
  {
    field: "memberNote",
    headerName: "Member note",
    filterable: false,
    width: 150,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    filterable: false,
    width: 150,
    sortable: false,
  },
  {
    field: "admitterNote",
    headerName: "Admitter note",
    filterable: false,
    width: 150,
    sortable: false,
  },
];

export default function App() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(new Filter());

  const absences = useSelector((state: State) => {
    const filterKey = filter.key;
    return state.absences[filterKey]?.[page]?.data;
  });
  const rowCount = useSelector((state: State) => {
    const filterKey = filter.key;
    return state.absences[filterKey]?.count;
  });
  const hasError = useSelector((state: State) => {
    const filterKey = filter.key;
    return state.absences[filterKey]?.[page]?.hasError;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAbsences(page, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  function filterChanged(newFilter: Filter) {
    if (!filter.isEqual(newFilter)) {
      setPage(0); // Go back to page 0 when a new filter is applied.
      setFilter(newFilter);
    }
  }

  function pageChanged(pageNo: number) {
    setPage(pageNo);
  }

  return (
    <>
      <div className={styles.header}>
        <img alt="logo" className={styles.logo} src={logo} />
        <h1 className={styles.title}>Absences</h1>
      </div>
      <div className={styles.gridContainer}>
        <AbsenceGrid
          absences={absences}
          columns={columns}
          page={page}
          rowCount={rowCount}
          hasError={hasError}
          filter={filter}
          onFilterChanged={(value: Filter) => filterChanged(value)}
          onPageChanged={(pageNo: number) => pageChanged(pageNo)}
        />
      </div>
    </>
  );
}
