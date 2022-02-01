import React, { useContext } from "react";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { Download } from "@mui/icons-material";
import { Tooltip, IconButton } from "@material-ui/core";
import FileSaver from "file-saver";
import ical from "ical-generator";
import { IAbsence } from "../models/types";
import Filter from "../models/filter";
import { VirtualizationContext } from "../context";

type AbsenceGridProps = {
  absences: IAbsence[] | null;
  columns: GridColDef[];
  hasError: boolean;
  page: number;
  rowCount: number;
  onPageChanged: (page: number) => void;
  onFilterChanged: (filter: Filter) => void;
};

function CustomToolbar({ absences }: { absences: IAbsence[] }) {
  function exportiCal() {
    const calendar = ical({ name: "absences" });
    if (absences) {
      absences.forEach((absence) => {
        calendar.createEvent({
          start: new Date(absence.startDate),
          end: new Date(absence.endDate),
          summary: `${absence["user.name"]} - ${absence.type}}`,
          description: `${absence["user.name"]}, ${absence.type}}, ${absence.admitterNote}}, ${absence.memberNote}}`,
          url: "https://crewmeister.com/",
        });
      });
    }
    FileSaver.saveAs(calendar.toBlob(), "absences.ical");
  }
  return (
    <GridToolbarContainer style={{ justifyContent: "end" }}>
      <Tooltip title="Export to iCal">
        <IconButton color="primary" onClick={() => exportiCal()}>
          <Download />
        </IconButton>
      </Tooltip>
    </GridToolbarContainer>
  );
}

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
      components={{
        Toolbar: CustomToolbar,
      }}
      componentsProps={{
        toolbar: { absences },
      }}
      columnBuffer={enableVirtualization ? undefined : columns.length}
      onPageChange={(pageNo) => pageChanged(pageNo)}
      onFilterModelChange={(filter) => filterChanged(new Filter(filter))}
    />
  );
}
