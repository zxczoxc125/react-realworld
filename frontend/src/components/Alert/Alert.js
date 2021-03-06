import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import useStyles from "./Alert.style";

const Alert = ({ severity = "error", message, handleOnClose }) => {
  const classes = useStyles();

  return (
    <Snackbar
      className={classes.root}
      autoHideDuration={3000}
      open={true}
      onClose={handleOnClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        aria-label={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
