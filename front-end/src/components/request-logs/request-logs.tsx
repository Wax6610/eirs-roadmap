import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import useStyles from "./style";
import { useStores } from "../../hooks/use-stores";
import RequestState from "../../types/request-state";
import { useObserver } from "mobx-react-lite";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import Loader from "../common/Loader";
import RequestLogGrid from "./request-log-grid";

function RequestLogs() {
  const classes = useStyles();
  const { requestLogsStore } = useStores();

  /* Кнопка закрытия модального окна*/
  const handleCancel = () => {
    requestLogsStore.closeDialog();
  };

  return useObserver(() => (
    <Fragment>
      <Dialog open maxWidth={"xl"} fullWidth>
        <DialogTitle>Логи запросов</DialogTitle>
        <DialogContent className={classes.content}>
          {requestLogsStore.state === RequestState.request && <Loader />}
          {requestLogsStore.state === RequestState.success && (
            <RequestLogGrid />
          )}
          {requestLogsStore.state === RequestState.failed && (
            <p className={classes.error}>Произошла ошибка во время загрузки.</p>
          )}
        </DialogContent>

        {/* Кнопки */}
        <DialogActions className={classes.buttons}>
          <React.Fragment>
            <Button color="primary" variant="contained" onClick={handleCancel}>
              Закрыть
            </Button>
          </React.Fragment>
        </DialogActions>
      </Dialog>
    </Fragment>
  ));
}

export default RequestLogs;
