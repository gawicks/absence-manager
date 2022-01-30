import React, { useContext } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IAbsence } from "../models/types";
import Filter from "../models/filter";
import { VirtualizationContext } from "../context";

type AbsenceGridProps = {
  absences: IAbsence[];
  columns: GridColDef[];
  hasError: boolean;
  page: number;
  rowCount: number;
  onPageChanged: (page: number) => void;
  onFilterChanged: (filter: Filter) => void;
};
export default function AbsenceGrid({
  absences,
  columns,
  hasError,
  page,
  rowCount,
  onPageChanged: pageChanged,
  onFilterChanged: filterChanged,
}: AbsenceGridProps) {
  const enableVirtualization = useContext(VirtualizationContext);

  return (
    <DataGrid
      loading={!(absences || hasError)}
      rows={absences || []}
      columns={columns}
      page={page}
      paginationMode="server"
      filterMode="server"
      rowCount={rowCount}
      pageSize={10}
      error={hasError ? true : undefined}
      onPageChange={(pageNo) => pageChanged(pageNo)}
      onFilterModelChange={(filter) => filterChanged(new Filter(filter))}
      columnBuffer={enableVirtualization ? undefined : columns.length}
    />
  );
}
