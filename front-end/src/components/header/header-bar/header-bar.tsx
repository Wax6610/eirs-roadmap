import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import UserToolbar from "../user-toolbar";
import useStyles from "./style";

function HeaderBar() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">ДК ЕИРС.КАМПУС.Организация работ</Typography>
        <UserToolbar />
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
