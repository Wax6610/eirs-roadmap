import React, { memo } from "react";
import { useObserver } from "mobx-react-lite";
import { TemplateCodes } from "./types/template-codes";
import { Button } from "@material-ui/core";
import useStyles from "./style";
import { useFormikContext } from "formik";

interface props<T> {
  code: TemplateCodes;
  fieldRef: any;
}

const TemplateCodesItem = ({ code, fieldRef }: props<JSX.Element>) => {
  const classes = useStyles();
  const { name, codeName } = code;
  const { values, setFieldValue } = useFormikContext();

  console.log(values);
  const handleClick = () => {
    const start = fieldRef.current.selectionStart;
    const end = fieldRef.current.selectionEnd;
    const { text } = values as { text: string };
    const newValue: string =
      text.slice(0, start) + `%${codeName}%` + text.slice(end, text.length);
    setFieldValue("text", newValue);
  };
  return useObserver(() => (
    <Button className={classes.item} onClick={handleClick} variant="outlined">
      {name}
    </Button>
  ));
};

export default memo(TemplateCodesItem);
