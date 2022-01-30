import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbsencesAction } from "../store/actions";
import Filter from "../models/filter";
import { State } from "../store/types";

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
  const [page] = useState(0);
  const [filter, setFilter] = useState(new Filter());

  const absences = useSelector((state: State) => {
    const filterKey = filter.key();
    return state.absences[filterKey]?.[page]?.data;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAbsencesAction(page, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  function filterChanged(newFilter: Filter) {
    setFilter(newFilter);
  }

  return (
    <DataGrid
      style={{ height: "500px" }}
      rows={absences || []}
      columns={columns}
      filterMode="server"
      onFilterModelChange={(value) => filterChanged(new Filter(value))}
      pageSize={10}
    />
  );
}
