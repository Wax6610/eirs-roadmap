import React, { useState } from "react";
import { useStores } from "../../../hooks/use-stores";
import { Badge, Paper } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import useStyles from "./style";
import UserList from "../user-list";
import { useObserver } from "mobx-react-lite";

function UserToolbar() {
  const { authSocketStore } = useStores();
  const [showUserList, setShowUserList] = useState(false);
  const classes = useStyles();

  return useObserver(() => (
    <div className={classes.container}>
      <div className={classes.username}>
        {authSocketStore.username || "Пользователь не определен"}
      </div>
      <Badge
        badgeContent={authSocketStore.users.length}
        color="secondary"
        overlap="rectangular"
        className={classes.badge}
        onClick={() => setShowUserList(true)}
      >
        <PeopleIcon></PeopleIcon>
      </Badge>
      {showUserList && <UserList onClose={() => setShowUserList(false)} />}
    </div>
  ));
}

export default UserToolbar;
