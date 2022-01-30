import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../models/filter";
import { State } from "../store/types";
import fetchAbsences from "../store/thunks";

const columns: GridColDef[] = [
  {
    field: "user.name",
    headerName: "Member name",
    filterable: false,
    width: 150,
    sortable: false,
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
    field: "absence.period",
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
    const filterKey = filter.key();
    return state.absences[filterKey]?.[page]?.data;
  });
  const rowCount = useSelector((state: State) => {
    const filterKey = filter.key();
    return state.absences[filterKey]?.count;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAbsences(page, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  function filterChanged(newFilter: Filter) {
    if (!filter.isEqual(newFilter)) {
      setPage(0);
      setFilter(newFilter);
    }
  }

  function pageChanged(pageNo: number) {
    setPage(pageNo);
  }

  return (
    <DataGrid
      style={{ height: "500px" }}
      rows={absences || []}
      columns={columns}
      filterMode="server"
      onFilterModelChange={(value) => filterChanged(new Filter(value))}
      pageSize={10}
      paginationMode="server"
      onPageChange={(pageNo) => pageChanged(pageNo)}
      rowCount={rowCount}
    />
  );
}
