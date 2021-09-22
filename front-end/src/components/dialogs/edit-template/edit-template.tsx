import React, { Fragment, memo, useRef } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";

import { useStores } from "../../../hooks/use-stores";
import { useObserver } from "mobx-react";

import useStyles from "./style";
import { Field, Form, Formik } from "formik";
import Box from "@material-ui/core/Box";
import { TextField } from "formik-material-ui";

import validationSchema from "./validation-schema";
import RequestState from "../../../types/request-state";
import TemplateCodesList from "./template-codes/template-codes-list";

function EditTemplate() {
  const classes = useStyles();
  const { templateStore } = useStores();

  const template = templateStore.getTemplateById(templateStore.selectedId);
  const { text, id } = template!;
  const ref = useRef();

  const handleOk = (values: any, actions: any) => {
    templateStore.saveTemplate({ ...values, id });
  };
  /* Кнопка закрытия модального окна*/
  const handleCancel = () => {
    templateStore.closeDialog();
  };

  return useObserver(() => (
    <Fragment>
      <Dialog open maxWidth={"lg"}>
        <DialogTitle>Редактирование шаблона</DialogTitle>
        <DialogContent className={classes.content}>
          {/* Костыль для mobx*/}
          {templateStore.state === RequestState.failed && <div></div>}

          <Formik
            enableReinitialize
            initialValues={{ text }}
            onSubmit={handleOk}
            validationSchema={validationSchema}
          >
            {({ submitForm, dirty, isValid, isSubmitting }) => (
              <Form>
                <TemplateCodesList fieldRef={ref} templateId={id} />

                <Box margin={1}>
                  <Field
                    disabled={templateStore.state === RequestState.request}
                    component={TextField}
                    className={classes.field}
                    multiline
                    required
                    rows={7}
                    name="text"
                    type="text"
                    label="Текст запроса"
                    InputProps={{
                      inputRef: ref,
                    }}
                  />
                </Box>
                {templateStore.state === RequestState.request && (
                  <LinearProgress />
                )}
                <Box margin={1} className={classes.buttons}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleCancel}
                  >
                    Отмена
                  </Button>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!(isValid && dirty)}
                    onClick={submitForm}
                  >
                    Сохранить
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Fragment>
  ));
}

export default EditTemplate;
