import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MockBackend from "./services/mockBackend";
import { Absence } from "./models/common.interfaces";

const columns: GridColDef[] = [
  {
    field: "user.name",
    headerName: "Member name",
    filterable: false,
    width: 150,
  },
  {
    field: "type",
    headerName: "Type of absence",
    type: "singleSelect",
    valueOptions: ["sickness", "vacation", "other"],
    width: 150,
  },
  {
    field: "period",
    headerName: "Period",
    type: "date",
    width: 300,
  },
  {
    field: "memberNote",
    headerName: "Member note",
    filterable: false,
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    filterable: false,
    width: 150,
  },
  {
    field: "admitterNote",
    headerName: "Admitter note",
    filterable: false,
    width: 150,
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

  return <DataGrid rows={absences} columns={columns} />;
}
