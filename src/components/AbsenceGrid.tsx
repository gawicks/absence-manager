import React, { useContext } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IAbsence, IFilter } from "../models/types";
import { VirtualizationContext } from "../context";
import Filter from "../models/filter";
import ExportToolbar from "./CustomToolbar/ExportToolbar";

type AbsenceGridProps = {
  absences: IAbsence[] | null;
  columns: GridColDef[];
  hasError: boolean;
  page: number;
  rowCount: number;
  filter: Filter;
  onPageChanged: (page: number) => void;
  onFilterChanged: (filter: IFilter) => void;
};

export default function AbsenceGrid({
  absences,
  columns,
  hasError,
  page,
  rowCount,
  filter,
  onPageChanged: pageChanged,
  onFilterChanged: filterChanged,
}: AbsenceGridProps) {
  //  Use primarily to disable column virtualization for DataGrid in tests. See
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
      components={{
        Toolbar: ExportToolbar,
      }}
      componentsProps={{
        toolbar: { filter },
      }}
      columnBuffer={enableVirtualization ? undefined : columns.length}
      onPageChange={(pageNo) => pageChanged(pageNo)}
      onFilterModelChange={(value) => filterChanged(new Filter(value))}
    />
  );
}
