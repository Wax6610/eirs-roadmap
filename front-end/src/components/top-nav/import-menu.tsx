import React, { memo } from "react";
import { Button, Link, Menu, MenuItem } from "@material-ui/core";
import useStyles from "./style";
import { useStores } from "../../hooks/use-stores";
import { useObserver } from "mobx-react-lite";

function ImportMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { importStore, importVipStore } = useStores();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    importStore.openDialog();
    setAnchorEl(null);
  };

  return useObserver(() => (
    <div>
      <Button aria-haspopup="true" onClick={handleClick}>
        Импорт
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
        <MenuItem
          component="a"
          href="http://v-suo-12r2-04.ca.sbrf.ru/eirs_roadmap/ДК ЕИРС Шаблон добавления.xlsx"
          onClick={() => close()}
        >
          Скачать образец
        </MenuItem>
        <MenuItem onClick={() => handleClose()}>
          Загрузить файл на сервер
        </MenuItem>

        <MenuItem
          component="a"
          href="http://v-suo-12r2-04.ca.sbrf.ru/eirs_roadmap/ВИП ВСП ЕИРС Шаблон добавления.xlsx"
          onClick={() => close()}
        >
          Скачать образец ВИП ВСП
        </MenuItem>
        <MenuItem onClick={() => importVipStore.openDialog()}>
          Загрузить ВИП ВСП
        </MenuItem>
      </Menu>
    </div>
  ));
}

export default ImportMenu;
