import React, { memo } from "react";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./style";
import { useStores } from "../../../hooks/use-stores";
import { useObserver } from "mobx-react-lite";

interface UserListProps {
  onClose: () => void;
}
function UserList({ onClose }: UserListProps) {
  const classes = useStyles();
  const { authSocketStore } = useStores();
  return useObserver(() => (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title="Пользователи в сети"
        action={
          <IconButton className={classes.icon} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />

      <CardContent className={classes.content}>
        <ul className={classes.list}>
          {authSocketStore.users.map((user) => (
            <li className={classes.listItem} key={user}>
              {user}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  ));
}
export default memo(UserList);
