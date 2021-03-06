import { Download } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import FileSaver from "file-saver";
import ical from "ical-generator";
import React, { useContext } from "react";
import { ServiceContext } from "../../context";
import { IFilter } from "../../models/types";
import styles from "./ExportToolbar.module.scss";

export default function ExportToolbar({ filter }: { filter: IFilter }) {
  const { absenceService } = useContext(ServiceContext);

  async function exportICal() {
    const calendar = ical({ name: "absences" });
    // Export all absences matching the current filter.
    const [absences] = await absenceService.getAllAbsences(filter);
    if (absences) {
      absences.forEach((absence) => {
        calendar.createEvent({
          start: new Date(absence.startDate),
          end: new Date(absence.endDate),
          summary: `${absence["user.name"]} - ${absence.type}`,
          description: `${absence["user.name"]} ${absence.type} ${absence.admitterNote} ${absence.memberNote}`,
          url: "https://crewmeister.com/",
        });
      });
    }
    FileSaver.saveAs(calendar.toBlob(), "absences.ics");
  }
  return (
    <GridToolbarContainer className={styles.toolbar}>
      <Tooltip title="Export to iCal">
        <IconButton color="primary" onClick={() => exportICal()}>
          <Download />
        </IconButton>
      </Tooltip>
    </GridToolbarContainer>
  );
}
