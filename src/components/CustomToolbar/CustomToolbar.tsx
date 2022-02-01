import { Download } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import FileSaver from "file-saver";
import ical from "ical-generator";
import React, { useContext } from "react";
import { ServiceContext } from "../../context";
import { IFilter } from "../../models/types";
import styles from "./CustomToolbar.module.scss";

export default function CustomToolbar({ filter }: { filter: IFilter }) {
  const { absenceService } = useContext(ServiceContext);

  async function exportiCal() {
    const calendar = ical({ name: "absences" });
    const [absences] = await absenceService.getAllAbsences(filter);
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
    FileSaver.saveAs(calendar.toBlob(), "absences.ics");
  }
  return (
    <GridToolbarContainer className={styles.toolbar}>
      <Tooltip title="Export to iCal">
        <IconButton color="primary" onClick={() => exportiCal()}>
          <Download />
        </IconButton>
      </Tooltip>
    </GridToolbarContainer>
  );
}
