import { ColGroupDef } from "@ag-grid-enterprise/all-modules";
import { format } from "date-fns";

export const GridColumns: Array<ColGroupDef> = [
  {
    headerName: "ПФ",
    children: [
      {
        headerName: "id",
        field: "id",
        hide: true,
      },
      {
        headerName: "Номер запроса",
        field: "createdId",
        width: 300,
      },
      {
        headerName: "Пользователь",
        field: "createdBy",
        width: 300,
      },
      {
        headerName: "Статус",
        field: "status",
        width: 250,
      },
      {
        headerName: "Дата создания",
        field: "timestampSoap",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.responseSoap);
          console.log(date, params.node.data.responseSoap);
          if (date) return format(date, "dd.MM.yyyy HH:mm:ss");
        },
        width: 250,
      },
      {
        headerName: "Отвеит интеграции",
        field: "responseSoap",

        width: 250,
        cellStyle: function (params) {
          console.log(typeof params.node.data.responseSoap);
          if (
            typeof params.node.data.responseSoap === "string" &&
            params.node.data.responseSoap.toLowerCase() !== "success"
          )
            return { backgroundColor: "#ff4d4d" };
        },
      },
    ],
  },
];
