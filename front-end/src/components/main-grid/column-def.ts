import { ColGroupDef } from "@ag-grid-enterprise/all-modules";
import { format, isWithinInterval } from "date-fns";

export const columnDef: Array<ColGroupDef> = [
  {
    headerName: "Информация об устройстве",
    groupId: "info",
    children: [
      {
        headerName: "id",
        field: "id",
        hide: true,
      },

      {
        headerName: "ID",
        field: "number",
        checkboxSelection: true,
        filter: "agTextColumnFilter",
        headerCheckboxSelection: false,
      },
      {
        headerName: "Период",
        field: "period",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Название",
        field: "name",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Путь",
        field: "path",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Статус",
        field: "status",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Счетчик офлайн",
        field: "offlineCounter",
        editable: true,
        filter: "agNumberColumnFilter",

      },
      {
        headerName: "Последний раз в сети",
        field: "lastSeen",
        columnGroupShow: "open",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.lastSeen);
          if (date) return format(date, "dd.MM.yyyy");
        },
      },
      {
        headerName: "Версия плеера",
        field: "playerVersion",
        columnGroupShow: "open",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Код подключения",
        field: "code",
        columnGroupShow: "open",
        editable: true,

        filter: "agSetColumnFilter",
      },
      {
        headerName: "Теги",
        columnGroupShow: "open",
        field: "tags",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Адрес",
        width: 300,
        columnGroupShow: "open",
        field: "address",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Описание",
        columnGroupShow: "open",
        field: "description",
        editable: true,
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Создано",
        field: "created",
        columnGroupShow: "open",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.created);
          if (date) return format(date, "dd.MM.yyyy");
        },
      },
      {
        headerName: "Обновлено",
        field: "updated",
        columnGroupShow: "open",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.updated);
          if (date) return format(date, "dd.MM.yyyy");
        },
      },
      {
        headerName: "Подключено",
        field: "connnected",
        columnGroupShow: "open",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.connnected);
          if (date) return format(date, "dd.MM.yyyy");
        },
      },
      {
        headerName: "Версия OS",
        field: "os",
        columnGroupShow: "open",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "CPU",
        field: "cpu",
        columnGroupShow: "open",
        filter: "agSetColumnFilter",
      },

      {
        headerName: "RAM всего",
        field: "ram",
        columnGroupShow: "open",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Требуется замена",
        field: "needUpgrade",
        columnGroupShow: "open",
        filter: "agSetColumnFilter",
      },

      {
        headerName: "Название ПК",
        field: "pcName",
        columnGroupShow: "open",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Имя пользователя",
        field: "userName",
        columnGroupShow: "open",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Внешний IP",
        field: "externalIp",
        columnGroupShow: "open",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Вутренний IP",
        field: "innerIp",
        columnGroupShow: "open",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Часовой пояс",
        field: "timezone",
        columnGroupShow: "open",
        filter: "agSetColumnFilter",
      },

      {
        headerName: "Доп.атрибуты",
        field: "attributes",
        columnGroupShow: "open",
        filter: "agSetColumnFilter",
      },

      {
        headerName: "Циклы",
        field: "cycle",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
    ],
  },
  {
    headerName: "Обследование точки ЕИРС",
    groupId: "check",
    children: [
      {
        headerName: "Запрос",
        field: "checkRequest",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Статус",
        field: "checkStatus",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Текст решения",
        field: "checkSolution",
        flex: 1,
        columnGroupShow: "open",
        filter: "agTextColumnFilter",
        tooltip: (params) => {
          return params.node.data.checkSolution;
        },
      },
      {
        headerName: "Дата исполнения",
        field: "checkDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.checkDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
      {
        headerName: "Контрольный срок",
        field: "checkPlanSolutionDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.checkPlanSolutionDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
    ],
  },

  {
    headerName: "Подключение точки ЕИРС",
    groupId: "connect",
    children: [
      {
        headerName: "Запрос",
        field: "connectRequest",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Статус",
        field: "connectStatus",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Текст решения",
        field: "connectSolution",
        flex: 1,
        columnGroupShow: "open",
        filter: "agTextColumnFilter",
        tooltip: (params) => {
          return params.node.data.connectSolution;
        },
      },
      {
        headerName: "Дата исполнения",
        field: "connectDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.connectDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
      {
        headerName: "Контрольный срок",
        field: "connectPlanSolutionDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.connectPlanSolutionDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
    ],
  },

  {
    headerName: "Замена ЖК панели ЕИРС",
    groupId: "display",
    children: [
      {
        headerName: "Запрос",
        field: "displayRequest",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Статус",
        field: "displayStatus",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Текст решения",
        flex: 1,
        field: "displaySolution",
        columnGroupShow: "open",
        filter: "agTextColumnFilter",
        tooltip: (params) => {
          return params.node.data.displaySolution;
        },
      },
      {
        headerName: "Дата исполнения",
        field: "displayDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.displayDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
      {
        headerName: "Контрольный срок",
        field: "displayPlanSolutionDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.displayPlanSolutionDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
    ],
  },

  {
    headerName: "Замена неттопа ЕИРС",
    groupId: "nettop",
    children: [
      {
        headerName: "Запрос",
        field: "nettopRequest",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Статус",
        field: "nettopStatus",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Текст решения",
        flex: 1,
        field: "nettopSolution",
        columnGroupShow: "open",
        filter: "agTextColumnFilter",
        tooltip: (params) => {
          return params.node.data.nettopSolution;
        },
      },
      {
        headerName: "Дата исполнения",
        field: "nettopDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.nettopDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
      {
        headerName: "Контрольный срок",
        field: "nettopPlanSolutionDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.nettopPlanSolutionDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
    ],
  },

  {
    headerName: "Инвентаризация точки ЕИРС",
    groupId: "inventory",
    children: [
      {
        headerName: "Запрос",
        field: "inventoryRequest",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Статус",
        field: "inventoryStatus",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Текст решения",
        flex: 1,
        field: "inventorySolution",
        columnGroupShow: "open",
        filter: "agTextColumnFilter",
        tooltip: (params) => {
          return params.node.data.inventorySolution;
        },
      },
      {
        headerName: "Дата исполнения",
        field: "inventoryDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.inventoryDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
      {
        headerName: "Контрольный срок",
        field: "inventoryPlanSolutionDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.inventoryPlanSolutionDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },

      {
        headerName: "Тип точки вещания",
        field: "inventoryType",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "ТБ",
        field: "inventoryTb",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Почтовый адрес",
        field: "inventoryPostcode",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Этаж",
        field: "inventoryFloor",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Зона/Сектор",
        field: "inventoryZone",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Кабинет",
        field: "inventoryCabinet",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Рабочее место",
        field: "inventoryWorkplace",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Серийный номер неттопа",
        field: "inventoryNettopSerial",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Инвентарный номер неттопа",
        field: "inventoryNettopNumber",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Производитель неттопа",
        field: "inventoryNettopMaker",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Модель неттопа",
        field: "inventoryNettopModel",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Доменное Имя неттопа",
        field: "inventoryDomen",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "IP неттопа",
        field: "inventoryIp",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "MAC Ethernet",
        field: "inventoryMac",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Разрешение",
        field: "inventoryResolution",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Серийный номер ЖК",
        field: "inventoryLcdSerial",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Инвентарный номер ЖК",
        field: "inventoryLcdNumber",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Производитель ЖК",
        field: "inventoryLcdMaker",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Модель ЖК",
        field: "inventoryLcdModel",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Диагональ ЖК",
        field: "inventoryLcdDiagonal",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Соотношение сторон ЖК",
        field: "inventoryLcdAspectRation",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Ориентация ЖК",
        field: "inventoryLcdOrientation",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Высота",
        field: "inventoryHeight",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Место размещения ЖК",
        field: "inventoryLcdPlace",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Настройка ЖК",
        field: "inventoryLcdSetting",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Состояние ЖК",
        field: "inventoryLcdStatus",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Состояние RS232",
        field: "inventoryRs232Status",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Диспропорция изображения",
        field: "inventoryImageBalance",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Состояние изображения",
        field: "inventoryImageStatus",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Наличие битых пикселей",
        field: "inventoryBrokenPixel",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Наличие Q-кода",
        field: "inventoryQCode",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "Ссылка  на Сбербанк-Сервис",
        field: "inventoryLink",
        filter: "agSetColumnFilter",
        columnGroupShow: "open",
      },
    ],
  },

  {
    headerName: "Организация технических работ",
    groupId: "tech",
    children: [
      {
        headerName: "Запрос",
        field: "techRequest",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Статус",
        field: "techStatus",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Текст решения",
        flex: 1,
        field: "techSolution",
        columnGroupShow: "open",
        filter: "agTextColumnFilter",
        tooltip: (params) => {
          return params.node.data.techSolution;
        },
      },
      {
        headerName: "Дата исполнения",
        field: "techDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.techDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
      {
        headerName: "Контрольный срок",
        field: "techPlanSolutionDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.techPlanSolutionDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
    ],
  },

  {
    headerName: "Ремон точки ЕИРС",
    groupId: "repair",
    children: [
      {
        headerName: "Запрос",
        field: "repairRequest",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Статус",
        field: "repairStatus",
        filter: "agSetColumnFilter",
      },
      {
        headerName: "Текст решения",
        field: "repairSolution",
        flex: 1,
        columnGroupShow: "open",
        filter: "agTextColumnFilter",
        tooltip: (params) => {
          return params.node.data.repairSolution;
        },
      },
      {
        headerName: "Дата исполнения",
        field: "repairDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.repairDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
      {
        headerName: "Контрольный срок",
        field: "repairPlanSolutionDate",
        valueGetter: (params) => {
          const date = Date.parse(params.node.data.repairPlanSolutionDate);
          if (date) return format(date, "dd.MM.yyyy");
        },
        //  filter: "agDateColumnFilter",
      },
    ],
  },
];
