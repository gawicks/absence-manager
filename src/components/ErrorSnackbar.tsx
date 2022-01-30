import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

export default function ErrorSnackbar({ message }: { message: string }) {
  const [open, setOpen] = useState(() => true);

  function handleClose() {
    setOpen(false);
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={() => handleClose()}
    >
      <Alert severity="error">{message}</Alert>
    </Snackbar>
  );
}
