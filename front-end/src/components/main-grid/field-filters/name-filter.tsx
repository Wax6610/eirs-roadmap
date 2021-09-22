import React, { useState, ChangeEvent, useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import { TextField, Button } from "@material-ui/core";
import {useStores} from "../../../hooks/use-stores";


function NameFilter() {
  const { mainViewStore } = useStores();
  const [notFound, setNotFound] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      const numArray: string[] = event.target.value.split(",");
      mainViewStore.nameFilter = numArray;

      // @ts-ignore
      const allTabNum = mainViewStore.data.map((v) => v.name);
      const notFound = numArray.filter((v) => !allTabNum.includes(v)).join(", ");
      setNotFound(notFound);
    } else {
      mainViewStore.nameFilter = [];
    }
  };
  const handleClick = () => {
    mainViewStore.showNameFilter = false;
  };

  return useObserver(() => (
    <div style={{ flexGrow: 1 }}>
      <div style={{ display: "flex", margin: "5px 10px", flexGrow: 1 }}>
        <TextField
          onChange={handleChange}
          style={{ width: "100%" }}
          label="Введите имена объектов через ,"
          variant="standard"
        />
        <Button onClick={handleClick}>Скрыть</Button>
      </div>
      <div style={{ color: "red", fontSize: 16, margin: "5px 10px" }}>
        {notFound}
      </div>
    </div>
  ));
}

export default NameFilter;
