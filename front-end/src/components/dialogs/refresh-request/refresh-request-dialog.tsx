import React, { Fragment, useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useStores } from "../../../hooks/use-stores";
import { useObserver } from "mobx-react";

import useStyles from "./style";

import RequestState from "../../../types/request-state";
import Switch from "@material-ui/core/Switch";
import { handleChangeSwitch } from "../../../services/handlers";

function RefreshRequestDialog() {
  const classes = useStyles();
  const { templateStore, refreshRequestStore } = useStores();
  const [replace, setReplace] = useState(false);
  const [remote, setRemote] = useState(false);
  const [isOkDisabled, setIsOkDisabled] = useState(false);

  // Получаем шаблон, по которому нужно сделать запросы
  const template = templateStore.getTemplateById(
    refreshRequestStore.selectedTemplate
  );
  // Название шаблона
  const { name, codeName } = template!;

  const handleOk = () => {
    refreshRequestStore.sendRequest(replace, remote);
  };
  /* Кнопка закрытия модального окна*/
  const handleCancel = () => {
    refreshRequestStore.closeDialog();
  };

  useEffect(() => {
    if (replace) setIsOkDisabled(false);
  }, [replace]);

  useEffect(() => {
    if (refreshRequestStore.state !== RequestState.init) setIsOkDisabled(true);
  }, [refreshRequestStore.state]);

  return useObserver(() => (
    <Fragment>
      <Dialog open maxWidth={"lg"}>
        <DialogTitle>Создание запросов</DialogTitle>
        <DialogContent className={classes.content}>
          {/* Костыль для mobx*/}

          <p>Перед созданием запросов, необходимо подтверждение</p>
          <p>
            <b>Шаблон</b>: {name}
          </p>
          <p>
            <b>Число устройств</b>: {refreshRequestStore.selectedSerial.length}
          </p>

          {!["vip_check", "vip_connect"].includes(codeName) && (
            <FormControlLabel
              control={
                <Switch
                  onChange={handleChangeSwitch(setRemote)}
                  checked={remote}
                  color="primary"
                />
              }
              label="Создать запрос на группу удаленной поддержки"
            />
          )}

          <FormControlLabel
            control={
              <Switch
                onChange={handleChangeSwitch(setReplace)}
                checked={replace}
                color="primary"
              />
            }
            label="Перезаписать существующие запросы"
          />

          {refreshRequestStore.state === RequestState.request && (
            <LinearProgress />
          )}

          {refreshRequestStore.state === RequestState.failed && (
            <>
              <Divider className={classes.divider} />
              <p className={classes.errorMessage}>
                Во врмя создания произошла ошибка. Обновите страницу и повторите
                операцию еще раз.
              </p>
            </>
          )}

          {/* Результаты создания запросов*/}
          {refreshRequestStore.state === RequestState.success && (
            <>
              <Divider className={classes.divider} />
              <p className={classes.resultHeader}>Запрос успешно обработан</p>

              {/* Успешно созданные запросы*/}
              {refreshRequestStore.result.created.length > 0 && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Создано запросов:
                    <span className={classes.successNumber}>
                      {refreshRequestStore.result.created.length}
                    </span>
                  </AccordionSummary>
                  <AccordionDetails className={classes.successSerialList}>
                    <div>Запросы созданы для объектов:</div>
                    <div>
                      <ul>
                        {refreshRequestStore.result.created.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>
                    </div>
                  </AccordionDetails>
                </Accordion>
              )}
              {/* Запросы не прошедшие проверку*/}
              {refreshRequestStore.result.checkFailedList.length > 0 && (
                <Accordion>
                  <AccordionSummary
                    id="failed-summary"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    Не прошли проверку:
                    <span className={classes.failedNumber}>
                      {refreshRequestStore.result.checkFailedList.length}
                    </span>
                  </AccordionSummary>
                  <AccordionDetails className={classes.errors}>
                    {refreshRequestStore.result.checkFailedList.map((res) => (
                      <div key={res.serial}>
                        <Divider variant="inset" />
                        <p>
                          <b>Устройство</b>: {res.serial}
                        </p>
                        <p>
                          <b>Причина</b>:
                        </p>
                        <ul>
                          {res.errors!.map((error) => (
                            <li key={Math.random()}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleCancel}
          >
            Закрыть
          </Button>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={isOkDisabled}
            onClick={handleOk}
          >
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  ));
}

export default RefreshRequestDialog;
