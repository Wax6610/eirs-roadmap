import React, { memo, useEffect } from "react";
import { useStores } from "./hooks/use-stores";
import AppLayout from "./components/app-layout";
import "./custom.css";
import RequestState from "./types/request-state";
import { useObserver } from "mobx-react-lite";

import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import { LocalizationProvider } from "@material-ui/pickers";

import Loader from "./components/common/Loader";
import { SnackbarProvider } from "notistack";
import socketService from "./services/socket-service";
import GatewayEvents from "./types/gateway-events";
import { Template } from "./components/dialogs/edit-template/types/template";
import { TemplateCodes } from "./components/dialogs/edit-template/template-codes/types/template-codes";
import { RequestSuccessResult } from "./components/dialogs/refresh-request/types/request-success-result";

function App() {
  const {
    authStore,
    authSocketStore,
    templateStore,
    importStore,
    importVipStore,
    mainViewStore,
    refreshRequestStore,
    requestLogsStore,
    vipViewStore,
  } = useStores();

  useEffect(() => {
    authStore.signIn();

    /* Обновление имени пользователя*/
    socketService.socket.on(GatewayEvents.AUTH_SUCCESS, (data: any) => {
      authSocketStore.updateUser(data.user);
      authSocketStore.updateUsers(data.list);
    });
  }, []);

  useEffect(() => {
    if (authStore.state === RequestState.success) {
      /* Загрузка шаблонов*/
      socketService.socket.on(
        GatewayEvents.SERVER_SEND_TEMPLATES,
        (data: Template[]) => {
          templateStore.loadTemplates(data);
        }
      );

      /*Обновление Списка подключеннных пользователей*/
      socketService.socket.on(
        GatewayEvents.USER_LIST_UPDATED,
        (userList: any) => {
          authSocketStore.updateUsers(userList);
        }
      );

      /* Обновление имени пользователя*/
      socketService.socket.on(
        GatewayEvents.SERVER_SEND_TEMPLATE_CODES,
        (data: TemplateCodes[]) => {
          templateStore.loadCodes(data);
        }
      );

      /* Обновление шаблонов после сохранения*/
      socketService.socket.on(
        GatewayEvents.SERVER_SEND_TEMPLATE_AFTER_SAVE,
        (data: Template) => {
          if (data) templateStore.updateTemplateAfterSave(data);
        }
      );

      socketService.socket.on(GatewayEvents.LOAD_MAIN_VIEW_ERROR, () => {
        mainViewStore.loadError();
      });

      /* Загрузка данных */
      socketService.socket.on(GatewayEvents.LOAD_VIP_SUCCESS, (data: any) => {
        vipViewStore.updateDataAfterLoad(data);
      });

      socketService.socket.on(GatewayEvents.LOAD_VIP_FAILED, (data: any) => {
        vipViewStore.loadError();
      });

      /* Сохранение успешно*/
      socketService.socket.on(
        GatewayEvents.SAVE_TEMPLATE_SUCCESS,
        (data: Template) => {
          templateStore.closeDialog();
        }
      );

      /* Ошибка при сохранении*/
      socketService.socket.on(
        GatewayEvents.SAVE_TEMPLATE_ERROR,
        (data: Template) => {
          templateStore.saveError();
        }
      );

      /* Закрываем окно импорта */
      socketService.socket.on(
        GatewayEvents.IMPORT_SUCCESS,
        (data: Template) => {
          importStore.closeDialog();
        }
      );

      /* Закрываем окно импорта */
      socketService.socket.on(GatewayEvents.IMPORT_ERROR, (data: Template) => {
        importStore.importError();
      });

      socketService.socket.on(
        GatewayEvents.IMPORT_VIP_SUCCESS,
        (data: Template) => {
          importVipStore.closeDialog();
        }
      );

      /* Закрываем окно импорта */
      socketService.socket.on(
        GatewayEvents.IMPORT_VIP_FAILED,
        (data: Template) => {
          importVipStore.importError();
        }
      );

      /* Загрузка данных */
      socketService.socket.on(
        GatewayEvents.LOAD_MAIN_VIEW_SUCCESS,
        (data: any) => {
          mainViewStore.updateDataAfterLoad(data);
        }
      );

      /*Запросы на те рефреш*/

      /* Успех */
      socketService.socket.on(
        GatewayEvents.REFRESH_REQUEST_SUCCESS,
        (data: RequestSuccessResult) => {
          console.log(GatewayEvents.VIP_REQUEST_SUCCESS);
          refreshRequestStore.requestSuccess(data);
        }
      );

      socketService.socket.on(
        GatewayEvents.VIP_REQUEST_SUCCESS,
        (data: RequestSuccessResult) => {
          console.log(GatewayEvents.VIP_REQUEST_SUCCESS);
          refreshRequestStore.requestSuccess(data);
        }
      );

      // Ошибка
      socketService.socket.on(
        GatewayEvents.REFRESH_REQUEST_ERROR,
        (data: any) => {
          console.log(GatewayEvents.REFRESH_REQUEST_ERROR);
          refreshRequestStore.requestError();
        }
      );

      // Ошибка
      socketService.socket.on(GatewayEvents.VIP_REQUEST_FAILED, (data: any) => {
        console.log(GatewayEvents.REFRESH_REQUEST_ERROR);
        refreshRequestStore.requestError();
      });

      {
        /* Запросы к ПФ */
      }

      // ЛОги запросов

      socketService.socket.on(
        GatewayEvents.GET_SM_REQUEST_SUCCESS,
        (data: any) => {
          requestLogsStore.getDataSuccess(data);
        }
      );

      socketService.socket.on(
        GatewayEvents.GET_SM_REUQEST_FAILED,
        (data: any) => {
          requestLogsStore.getDataFailed();
        }
      );

      socketService.socket.on(GatewayEvents.SYNC_DATE_LOADED, (data: any) => {

        console.log(data,"da");
        mainViewStore.syncDate.apiSyncDate = new Date(
          data.apiSyncDate.dateValue
        );
        mainViewStore.syncDate.dbSyncDate = new Date(data.dbSyncDate.dateValue);
      });

      socketService.socket.on("disconnect", () => {
        authStore.setOffline(true);
      });

      socketService.getTemplates();
      socketService.getTemplateCodes();
      socketService.getFilterData();

      // socketService.socket.emit(GatewayEvents.UPDATE_KEYWORDS);
    }
  }, [authStore.state]);

  /* Внешний обработчик если изменилось выделенные значения*/

  return useObserver(() => (
    <React.Fragment>
      {authStore.state === RequestState.init && <Loader />}
      {authStore.state === RequestState.failed && (
        <h3 style={{ display: "flex", justifyContent: "center " }}>
          Ошибка авторизации. Закройте браузер и попробуйте еще раз
        </h3>
      )}
      {authStore.state === RequestState.success && (
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <SnackbarProvider maxSnack={5} hideIconVariant={false}>
            <AppLayout />
          </SnackbarProvider>
        </LocalizationProvider>
      )}
    </React.Fragment>
  ));
}

export default memo(App);
