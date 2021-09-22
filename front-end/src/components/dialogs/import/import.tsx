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

function Import() {
  const classes = useStyles();
  const { importStore } = useStores();
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
    if (importStore.state === RequestState.request) setOkDisabled(true);
    if (importStore.state === RequestState.failed) setOkDisabled(false);
  }, [importStore.state]);


  const handleOk = (event: any) => {
    event.preventDefault();
    importStore.sendFile(file);
  };
  /* Кнопка закрытия модального окна*/
  const handleCancel = () => {
    importStore.closeDialog();
  };

  return useObserver(() => (
    <Fragment>
      <Dialog open maxWidth={"lg"}>
        <DialogTitle>Импортирование данных</DialogTitle>
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

          {importStore.state === RequestState.request && <LinearProgress />}
          {importStore.state === RequestState.failed && (
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

export default memo(Import);
