import { ColGroupDef } from "@ag-grid-enterprise/all-modules";
import { format, isWithinInterval } from "date-fns";

export const columnDef: Array<ColGroupDef> = [
  {
    headerName: "Информация о точке ЕИРС",
    children: [
      {
        headerName: "id",
        field: "id",
        hide: true,
      },
      {
        headerName: "№ Экрана",
        field: "screenName",
        editable: true,
        filter: "agTextColumnFilter",
        checkboxSelection: true,
      },
      {
        headerName: "ВСП",
        field: "vsp",
        filter: "agTextColumnFilter",
        rowGroup: true,
      },

      {
        headerName: "ТБ",
        field: "tb",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Тип",
        field: "type",
        editable: true,
        filter: "agSetColumnFilter",
      },

      {
        headerName: "Город",
        field: "city",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Адрес",
        field: "address",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "График работы",
        field: "schedule",
        editable: true,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Кол-во панелей",
        field: "screenNumber",
        editable: true,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Кол-во nettop",
        field: "nettopNumber",
        editable: true,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Время визита",
        field: "visitTime",
        editable: true,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Должность МОЛ",
        field: "mol",
        editable: true,
        filter: "agTextColumnFilter",
      },
    ],
  },
  {
    headerName: "Обследование точки ЕИРС",
    children: [
      {
        headerName: "Запрос",
        field: "checkRequest",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Статус",
        field: "checkStatus",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Текст решения",
        field: "checkSolution",
        columnGroupShow: "open",
        filter: "agTextColumnFilter",
        tooltip: (params) => {
          return params.node.data ? params.node.data.checkSolution : "";
        },
      },
      {
        headerName: "Дата исполнения",
        field: "checkDate",
        valueGetter: (params) => {
          if (!params.node.data) return "";
          const date = Date.parse(params.node.data.checkDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
      {
        headerName: "Контрольный срок",
        field: "checkPlanSolutionDate",
        valueGetter: (params) => {
          if (!params.node.data) return "";
          const date = Date.parse(params.node.data.checkPlanSolutionDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
    ],
  },

  {
    headerName: "Результат обследования",
    children: [
      {
        headerName: "Есть экран",
        field: "screen",
        filter: "agSetColumnFilter",
      },

      {
        headerName: "Есть неттоп",
        field: "nettop",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Есть 220",
        field: "i220",
        filter: "agSetColumnFilter",
      },

      {
        headerName: "Есть LAN",
        field: "lan",
        filter: "agSetColumnFilter",
      },

      {
        headerName: "Есть место",
        field: "place",
        filter: "agSetColumnFilter",
      },

      {
        headerName: "РВСП оповещен",
        field: "warned",
        filter: "agSetColumnFilter",
      },
    ],
  },

  /*
  @Column({ name: 'is_warned' })
  isWarned: boolean;

    * */
  //-------------

  {
    headerName: "Подключение ЕИРС",
    children: [
      {
        headerName: "Запрос",
        field: "connectRequest",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Статус",
        field: "connectStatus",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Текст решения",
        field: "connectSolution",
        columnGroupShow: "open",
        filter: "agTextColumnFilter",
        tooltip: (params) => {
          return params.node.data ? params.node.data.checkSolution : "";
        },
      },
      {
        headerName: "Дата исполнения",
        field: "connectDate",
        valueGetter: (params) => {
          if (!params.node.data) return "";
          const date = Date.parse(params.node.data.connectDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
      {
        headerName: "Контрольный срок",
        field: "connectPlanSolutionDate",
        valueGetter: (params) => {
          if (!params.node.data) return "";
          const date = Date.parse(params.node.data.connectPlanSolutionDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
    ],
  },
];
