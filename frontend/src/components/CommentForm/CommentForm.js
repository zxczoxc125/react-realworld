import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";
import useStyles from "./CommentForm.style";

const CommentForm = () => {
  const classes = useStyles();

  return (
    <form aria-label="comment" className={classes.root}>
      <Grid container>
        <Grid item xs={9}>
          <TextField
            label="Add Comment.."
            multiline
            rowsMax={2}
            variant="filled"
            fullWidth
            inputProps={{ "aria-label": "body", role: "input" }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            color="primary"
            aria-label="submit"
            type="submit"
            fullWidth
            className={classes.fullHeight}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;
