import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Loader() {
  const classes = useStyles();
  return (
    <div className={classes.progress}>
      <CircularProgress color="primary" />
    </div>
  );
}

export default Loader;
