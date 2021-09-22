import React, { useEffect, Fragment } from "react";
import { Divider, Tab, Tabs } from "@material-ui/core";
import { useObserver } from "mobx-react";

import TopNav from "../top-nav/top-nav";
import MainGrid from "../main-grid/MainGrid";

import useStyles from "./style";
import socketService from "../../services/socket-service";
import GatewayEvents from "../../types/gateway-events";
import { useSnackbar } from "notistack";
import { useStores } from "../../hooks/use-stores";
import RequestState from "../../types/request-state";

import HeaderBar from "../header/header-bar/header-bar";
import EditTemplate from "../dialogs/edit-template/edit-template";
import Import from "../dialogs/import/import";
import RefreshRequestDialog from "../dialogs/refresh-request/refresh-request-dialog";

import RequestLogs from "../request-logs/request-logs";

import { Alert } from "@material-ui/lab";
import ImportVip from "../dialogs/import-vip/import-vip";
import { ImportVipStore } from "../../stores";
import VipGrid from "../vip-grid/vip-grid";

const AppLayout: React.FC = (props) => {
  const classes = useStyles();
  const {
    authStore,
    templateStore,
    importStore,
    importVipStore,
    refreshRequestStore,
    appStore,
    requestLogsStore,
  } = useStores();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (authStore.state === RequestState.success) {
      /* Сообщение об успехе от сервера*/
      socketService.socket.on(
        GatewayEvents.SUCCESS_MESSAGE,
        (message: string) => {
          enqueueSnackbar(message, {
            variant: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          });
        }
      );

      /* Сообщение об ошибке от сервера*/
      socketService.socket.on(
        GatewayEvents.ERROR_MESSAGE,
        (message: string) => {
          console.log(GatewayEvents.ERROR_MESSAGE);
          enqueueSnackbar(message, {
            variant: "error",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          });
        }
      );
    }
  }, [authStore.state]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    appStore.setTab(newValue);
  };

  return useObserver(() => (
    <div id="wrapper" className={classes.root}>
      <HeaderBar />

      <Fragment>
        {/* Меню навигации*/}
        <TopNav />

        {authStore.isOffline && (
          <Alert severity="error">
            Пропало соединение с сервером, обновите страницу
          </Alert>
        )}

        <div id="app-body" className={classes.body}>
          {/* Редактироване шаблона*/}
          {templateStore.isDialogOpen && <EditTemplate />}

          {/* Основная таблица */}
          {importStore.isDialogOpen && <Import />}

          {importVipStore.isDialogOpen && <ImportVip />}

          {/* Создаение запросов рефеш*/}
          {refreshRequestStore.isDialogOpen && <RefreshRequestDialog />}

          {/* Логи запросов*/}
          {requestLogsStore.isDialogOpen && <RequestLogs />}

          {/* Основная таблица*/}
          {appStore.tab === 0 && <MainGrid />}

          {appStore.tab === 1 && <VipGrid />}
        </div>
      </Fragment>

      <div id="app-footer" className={classes.footer}>
        <Divider />
        <Tabs
          value={appStore.tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="Основная таблица" />

          <Tab label="ВИП ВСП" />
        </Tabs>
      </div>
    </div>
  ));
};

export default AppLayout;
