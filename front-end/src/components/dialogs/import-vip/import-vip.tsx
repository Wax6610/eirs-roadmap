import React, { ChangeEvent, Fragment, memo, useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";

import { useStores } from "../../../hooks/use-stores";
import { useObserver } from "mobx-react";

import useStyles from "./style";

import RequestState from "../../../types/request-state";

function ImportVip() {
  const classes = useStyles();
  const { importVipStore } = useStores();
  const [file, setFile] = useState<any>(null);
  const [name, setName] = useState("");
  const [okDisabled, setOkDisabled] = useState(true);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setName(event.target.files[0].name);
    setFile(event.target.files[0]);
    setOkDisabled(false);
  };

  useEffect(() => {
    if (importVipStore.state === RequestState.request) setOkDisabled(true);
    if (importVipStore.state === RequestState.failed) setOkDisabled(false);
  }, [importVipStore.state]);

  const handleOk = (event: any) => {
    event.preventDefault();
    importVipStore.sendFile(file);
  };
  /* Кнопка закрытия модального окна*/
  const handleCancel = () => {
    importVipStore.closeDialog();
  };

  return useObserver(() => (
    <Fragment>
      <Dialog open maxWidth={"lg"}>
        <DialogTitle>Импортирование данных о ВИП ВСП</DialogTitle>
        <DialogContent className={classes.content}>
          {/* Форма */}

          <form className={classes.form}>
            <input
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <p className={classes.name}>{name}</p>
            <label htmlFor="contained-button-file">
              <Button color="primary" component="span">
                Выберите файл
              </Button>
            </label>
          </form>

          {importVipStore.state === RequestState.request && <LinearProgress />}
          {importVipStore.state === RequestState.failed && (
            <p className={classes.error}>
              Произошла ошибка во время загрузки. Проверьте корректность файла и
              загрузите его еще раз.
            </p>
          )}
        </DialogContent>

        {/* Кнопки */}
        <DialogActions className={classes.buttons}>
          <React.Fragment>
            <Button color="primary" variant="contained" onClick={handleCancel}>
              Отмена
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleOk}
              disabled={okDisabled}
            >
              Загрузить
            </Button>
          </React.Fragment>
        </DialogActions>
      </Dialog>
    </Fragment>
  ));
}

export default ImportVip;
