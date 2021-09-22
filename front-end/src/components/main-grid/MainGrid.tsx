import React, { useEffect } from "react";
import {
  AllModules,
  CellEditingStoppedEvent,
  ColumnApi,
  GridApi,
  GridReadyEvent,
  SelectionChangedEvent,
  StatusPanelDef,
} from "@ag-grid-enterprise/all-modules";
import { AgGridReact } from "@ag-grid-community/react";
import { columnDef } from "./column-def";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css";

import { useStores } from "../../hooks/use-stores";
import { useObserver } from "mobx-react";
import { observe, reaction, toJS } from "mobx";
import { MainView } from "./types/main-view";
import { localeTextRu } from "./locale-text-ru";

import RequestState from "../../types/request-state";
import LastUpdatedPanel from "./last-updated-panel";
import { format } from "date-fns";

const MainGrid: React.FC = () => {
  const { mainViewStore, refreshRequestStore } = useStores();

  const [gridApi, setGridApi] = React.useState<GridApi | undefined>();
  const [colApi, setColApi] = React.useState<ColumnApi | undefined>();

  const frameworkComponents = {
    LastDataUpdated: LastUpdatedPanel,
  };
  const statusPanels: StatusPanelDef[] = [
    {
      statusPanel: "agTotalAndFilteredRowCountComponent",
      align: "left",
    },
    {
      statusPanel: "LastDataUpdated",
      align: "left",
    },
    {
      statusPanel: "agSelectedRowCountComponent",
    },
  ];

  const statusBar = {
    statusPanels: statusPanels,
  };

  function handleGridReady(event: GridReadyEvent) {
    setGridApi(event.api);
    setColApi(event.columnApi);
    if (mainViewStore.data.length === 0) mainViewStore.loadData();
  }

  useEffect(() => {
    if (mainViewStore.state === RequestState.request)
      gridApi?.showLoadingOverlay();
    else gridApi?.hideOverlay();
  }, [mainViewStore.state]);

  function handleSelectionChanged(event: SelectionChangedEvent) {
    const nodes = event.api.getSelectedNodes();
    const serial: string[] = [];
    nodes.forEach((value) => serial.push(value.data.number));
    refreshRequestStore.setSelectedSerial(serial);
  }

  function handleCellChange(event: CellEditingStoppedEvent) {
    if (event.colDef.field)
      if (
        [
          "name",
          "path",
          "status",
          "lastSeen",
          "playerVersion",
          "code",
          "tags",
          "address",
          "description",
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
          "period",
        ].includes(event.colDef.field)
      )
        mainViewStore.saveMain({
          key: event.data.number,
          field: event.colDef.field,
          value: event.value,
        });
      else
        mainViewStore.saveRodamap({
          key: event.data.number,
          field: event.colDef.field,
          value: event.value,
        });
  }

  const getContextMenu = (params: any) => [
    "copy",
    "excelExport",

    {
      name: "Выделить все",
      action: function () {
        params.api?.selectAllFiltered();
      },
    },
    {
      name: "Сбросить выделение",
      action: function () {
        params.api?.deselectAll();
      },
    },
    {
      name: "Сбросить фильтры",
      action: function () {
        params.api?.setFilterModel(null);
        params.api?.onFilterChanged();
      },
    },
    {
      name: "Сбросить выделение и фильтры",
      action: function () {
        params.api?.setFilterModel(null);
        params.api?.onFilterChanged();
        params.api?.deselectAll();
      },
    },
    {
      name: "Фильтр по имени",
      action: function () {
        mainViewStore.showNameFilter = true;
      },
    },
  ];

  const nameFilterReaction = reaction(
    () => mainViewStore.nameFilter,
    (filter) => {
      if (filter.length > 0) {
        const model = {
          name: {
            filterType: "set",
            values: filter,
          },
        };

        gridApi?.setFilterModel(model);
        gridApi?.onFilterChanged();
      } else {
        gridApi?.setFilterModel(null);
        gridApi?.onFilterChanged();
        gridApi?.deselectAll();
      }

      /* gridApi.setFilterModel({

              })*/
    }
  );

  const FilterModeReaction = reaction(
    () => mainViewStore.filter,
    (filter) => {
      if (filter === "all") {
        gridApi?.setFilterModel(null);
        gridApi?.onFilterChanged();
        gridApi?.deselectAll();
      } else if (filter === "repair") {
        // Кнопка ремонт
        /* Для фильтра по датам необходимо сформировать все возможные даты, убрать из них текущий день.
          Т.к. в таблице значения отформатированы, то форматируем их еще раз для фильтра*/

        const path = mainViewStore.data
          .filter((v) => !v.path.toLowerCase().includes("not activated"))
          .filter((v) => !v.path.toLowerCase().includes("offline"))

          .map((v) => v.path);

        const dates = mainViewStore.data
          .filter((v) => v.repairDate !== null) // Убираем пустые значения
          .map((v) => {
            // Форматируем
            const date = new Date(v.repairDate);
            if (date) return format(date, "dd.MM.yyyy");
          })
          .filter((v) => {
            // Убираем текущий день
            const date = format(new Date(), "dd.MM.yyyy");
            return v !== date;
          });

        const model = {
          status: {
            filterType: "set",
            values: ["offline"],
          },
          repairStatus: {
            filterType: "set",
            values: [null, "Выполнен"],
          },
          path: {
            filterType: "set",
            values: path,
          },
          repairDate: {
            filterType: "set",
            values: [null, ...dates],
          },
        };
        gridApi?.setFilterModel(model);
        gridApi?.onFilterChanged();
      }

      /* gridApi.setFilterModel({
      
                    })*/
    }
  );

  const onFilterChanged = (params: any) => {
    // console.log(gridApi?.getFilterInstance('tb').appliedModel);

    const model: any = gridApi?.getFilterModel();

    //
    //console.log(mainViewStore.applyFilter.tb)
  };

  // Скрываем лишние столбцы
  const changeModeReaction = reaction(
    () => mainViewStore.mode,
    (selected) => {
      // Сбрасываем значение
      colApi?.resetColumnState();

      if (selected === "all") return;

      const collums = colApi?.getAllColumns();
      if (!collums) return;
      const ids: string[] = [];
      // Если колонка принадлежит нужной группе - игнорируем ее
      for (const col of collums) {
        const parent = col.getOriginalParent()?.getId();
        if (parent !== selected && parent !== "info") {
          ids.push(col.getColId());
        }
      }
      // Оставляем значение ID для удобства (2 раза, т.к. первой колонкой идет скрытый столбец)
      //  ids.shift();
      //ids.shift();
      colApi?.setColumnsVisible(ids, false);
      //colApi?.setColumnGroupOpened("info", false);
      colApi?.setColumnGroupOpened(selected, true);
    }
  );

  useEffect(() => {
    changeModeReaction();
  }, []);

  return useObserver(() => (
    <>
      <div style={{ flex: "1" }} className="ag-theme-alpine">
        {
          <AgGridReact
            columnDefs={columnDef}
            rowData={mainViewStore.data}
            //rowBuffer={4}
            //  cacheBlockSize={1000}
            //  maxBlocksInCache={1}
            // rowData={mainViewStore.data}
            //   defaultColDef={defCol}
            floatingFilter={true}
            onGridReady={handleGridReady}
            //  rowModelType="serverSide"
            //  onCellClicked={handleCellClick}
            enableSorting
            enableFilter
            enableColResize={true}
            statusBar={statusBar}
            frameworkComponents={frameworkComponents}
            getRowNodeId={(row: MainView) => row.id.toString()}
            rowSelection="multiple"
            groupSelectsChildren
            groupSelectsFiltered
            debug={true}
            modules={AllModules}
            enableCellTextSelection
            localeText={localeTextRu}
            onSelectionChanged={handleSelectionChanged}
            onCellEditingStopped={handleCellChange}
            suppressCopyRowsToClipboard={true}
            tooltipShowDelay={500}
            getContextMenuItems={getContextMenu}
            suppressRowClickSelection
            //  rowMultiSelectWithClick={true}
            onFilterChanged={onFilterChanged}
            //suppressNoRowsOverlay={true}
          ></AgGridReact>
        }
      </div>
      <div style={{ display: "none" }}>{mainViewStore.state}</div>
    </>
  ));
};

export default MainGrid;
