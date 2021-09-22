import React from "react";
import { useStores } from "../../hooks/use-stores";
import { useObserver } from "mobx-react";
import { format } from "date-fns";

const LastUpdatedPanel = () => {
  const { mainViewStore } = useStores();
  console.log(mainViewStore.syncDate, "mainViewStore");
  return useObserver(() => (
    <div style={{ margin: "0 10px", padding: "12px 0" }}>
      Дата синхронизации c АПИ:{" "}
      <b>
        {mainViewStore.syncDate.apiSyncDate &&
          format(mainViewStore.syncDate.apiSyncDate, "dd.MM.yyyy : HH:mm:ss")}
      </b>
        <span style={{marginLeft : '20px'}}></span>Дата синхронизации c БД:{" "}
      <b>
        {mainViewStore.syncDate.dbSyncDate &&
          format(mainViewStore.syncDate.dbSyncDate, "dd.MM.yyyy : HH:mm:ss")}
      </b>
    </div>
  ));
};

export default LastUpdatedPanel;
