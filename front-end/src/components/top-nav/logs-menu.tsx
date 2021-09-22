import React, { memo } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import useStyles from "./style";
import { useStores } from "../../hooks/use-stores";
import { useObserver } from "mobx-react-lite";

function LogsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { requestLogsStore } = useStores();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    requestLogsStore.openDialog();
    setAnchorEl(null);
  };

  return useObserver(() => (
    <div>
      <Button aria-haspopup="true" onClick={handleClick}>
        Логи
      </Button>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={() => handleClose()}>Логи запросов</MenuItem>
      </Menu>
    </div>
  ));
}

export default LogsMenu;
