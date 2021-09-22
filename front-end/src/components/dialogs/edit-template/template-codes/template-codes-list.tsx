import React, { RefObject } from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../../../hooks/use-stores";
import { TemplateCodes } from "./types/template-codes";
import TemplateCodesItem from "./template-codes-item";
import useStyles from "./style";

interface props<T> {
  fieldRef: any;
  templateId: number;
}
const TemplateCodesList = ({ fieldRef, templateId }: props<JSX.Element>) => {
  const { templateStore, appStore } = useStores();
  const classes = useStyles();
  const refreshButtons = [
    "name",
    "path",
    "tb",
    "status",
    "lastSeen",
    "playerVersion",
    "code",
    "tags",
    "address",
    "description",
    "created",
    "updated",
    "connnected",
    "os",
    "cpu",
    "ram",
    "pcName",
    "userName",
    "externalIp",
    "innerIp",
    "timezone",
    "attributes",
    "cycle",
  ];

  const vipButtons = [
    ,
    "tb",
    "type",
    "vsp",
    "city",
    "address",
    "schedule",
    "screenNumber",
    "nettopNumber",
    "visitTime",
    "mol",
  ];
  return useObserver(() => (
    <div className={classes.list}>
      {templateStore.codes
        .filter(
          (v) =>
            (appStore.tab === 0 && refreshButtons.includes(v.codeName)) ||
            (appStore.tab === 1 && vipButtons.includes(v.codeName))
        )
        .map((code: TemplateCodes) => (
          <TemplateCodesItem code={code} fieldRef={fieldRef} key={code.id} />
        ))}
    </div>
  ));
};

export default TemplateCodesList;
