import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { useStores } from "../../hooks/use-stores";
import { useObserver } from "mobx-react";
import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import TemplateMenu from "./template-menu";
import RefreshRequestMenu from "./refresh-request-menu";
import LogsMenu from "./logs-menu";
import ImportMenu from "./import-menu";

import NameFilter from "../main-grid/field-filters/name-filter";

interface Buttons {
  id: string;
  header: string;
}
function TopNav() {
  const classes = useStyles();

  const { mainViewStore, appStore } = useStores();

  const handleModeButtons = (num: string) => {
    mainViewStore.mode = num;
  };

  const handleFilterButtons = (filter: string) => {
    mainViewStore.mode = filter;
    mainViewStore.filter = filter;
  };

  const filterButtons: Buttons[] = [
    {
      id: "all",
      header: "Все",
    },
    {
      id: "repair",
      header: "Ремонт",
    },
  ];
  const buttons: Buttons[] = [
    {
      id: "all",
      header: "Все",
    },
    {
      id: "check",
      header: "Обследование",
    },
    {
      id: "connect",
      header: "Подключение",
    },
    {
      id: "display",
      header: "Замена ЖК",
    },
    {
      id: "nettop",
      header: "Замена неттопа",
    },
    {
      id: "inventory",
      header: "Инвентаризация",
    },
    {
      id: "tech",
      header: "Организация тех. работ",
    },
    {
      id: "repair",
      header: "Ремонт",
    },
  ];
  return useObserver(() => (
    <div className={classes.root}>
      <div className={classes.buttonsRow}>
        <TemplateMenu />
        <RefreshRequestMenu />
        <LogsMenu />

        <ImportMenu />
      </div>
      <Divider></Divider>

      {appStore.tab === 0 && (
        <div className={classes.buttonsMenu}>
          <div className={classes.buttonsRowBottom}>
            <FormLabel className={classes.buttonsLabel}>
              Выберите группу полей для просмотра
            </FormLabel>
            <FormControl>
              <div className={classes.buttons}>
                {buttons.map((v) => (
                  <Button
                    key={v.id}
                    onClick={() => handleModeButtons(v.id)}
                    variant={
                      v.id === mainViewStore.mode ? "contained" : "outlined"
                    }
                    className={classes.button}
                  >
                    {v.header}
                  </Button>
                ))}
              </div>
            </FormControl>
          </div>

          <div
            className={classes.buttonsRowBottom}
            style={{ alignItems: "flex-end" }}
          >
            <FormLabel className={classes.buttonsLabel}>
              Выберите фильтр
            </FormLabel>
            <FormControl>
              <div className={classes.buttons}>
                {filterButtons.map((v) => (
                  <Button
                    key={v.id}
                    onClick={() => handleFilterButtons(v.id)}
                    variant={
                      v.id === mainViewStore.filter ? "contained" : "outlined"
                    }
                    className={classes.button}
                  >
                    {v.header}
                  </Button>
                ))}
              </div>
            </FormControl>
          </div>
        </div>
      )}

      <div className={classes.buttonsRowBottom}>
        {mainViewStore.showNameFilter && <NameFilter />}
      </div>
    </div>
  ));
}

export default TopNav;
