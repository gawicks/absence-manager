import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MockBackend from "../services/mockBackend";
import { Absence } from "../models/common.interfaces";

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

const backend = new MockBackend();
export default function App() {
  const [absences, setAbsences] = useState([] as Absence[]);

  async function fetchAbsences() {
    const [abs] = await backend.getAbsences();
    setAbsences(abs);
  }
  useEffect(() => {
    fetchAbsences();
  }, []);

  return (
    <DataGrid style={{ height: "500px" }} rows={absences} columns={columns} />
  );
}
