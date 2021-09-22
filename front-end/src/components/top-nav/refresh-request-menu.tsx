import React, { memo } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import useStyles from "./style";
import { useStores } from "../../hooks/use-stores";
import { useObserver } from "mobx-react-lite";

function RefreshRequestMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { templateStore, refreshRequestStore, appStore } = useStores();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id: number) => {
    refreshRequestStore.openDialog(id);
    // else if (id === 6) pfRequestStore.openDialog();

    setAnchorEl(null);
  };


  return useObserver(() => (
    <div>
      <Button
        aria-haspopup="true"
        onClick={handleClick}
        // disabled={refreshRequestStore.selectedSerial.length === 0}
      >
        Создание запросов
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
        {templateStore.data
          .filter(
            (template) =>
              (appStore.tab === 0 &&
                !["vip_check",'vip_connect'].includes(template.codeName)) ||
              (appStore.tab === 1 &&
                ["vip_check",'vip_connect'].includes(template.codeName))
          )

          .map((template) => (
            <MenuItem
              key={template.id}
              disabled={refreshRequestStore.selectedSerial.length === 0}
              onClick={() => handleClose(template.id)}
            >
              {template.name}
            </MenuItem>
          ))}
      </Menu>
    </div>
  ));
}

export default memo(RefreshRequestMenu);
