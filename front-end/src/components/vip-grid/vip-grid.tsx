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
import { VipView } from "./types/vip-view";
import { localeTextRu } from "../main-grid/locale-text-ru";

import RequestState from "../../types/request-state";

const VipGrid: React.FC = () => {
  const { vipViewStore, refreshRequestStore } = useStores();

  const [gridApi, setGridApi] = React.useState<GridApi | undefined>();
  let colApi: ColumnApi | undefined;
  const statusPanels: StatusPanelDef[] = [
    {
      statusPanel: "agTotalAndFilteredRowCountComponent",
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
    colApi = event.columnApi;
    if (vipViewStore.data.length === 0) vipViewStore.loadData();
  }

  useEffect(() => {
    if (vipViewStore.state === RequestState.request)
      gridApi?.showLoadingOverlay();
    else gridApi?.hideOverlay();
  }, [vipViewStore.state]);

  function handleSelectionChanged(event: SelectionChangedEvent) {
    const nodes = event.api.getSelectedNodes();
    const serial: string[] = [];
    nodes.forEach((value) => serial.push(value.data.screenName));
    refreshRequestStore.setSelectedSerial(serial);
  }

  function handleCellChange(event: CellEditingStoppedEvent) {
    if (event.colDef.field)
      if (
        [
          "tb",
          "type",
          "city",
          "address",
          "schedule",
          "screenNumber",
          "nettopNumber",
          "visitTime",
          "mol",
        ].includes(event.colDef.field)
      )
        vipViewStore.saveMain({
          key: event.data.screenName,
          field: event.colDef.field,
          value: event.value,
        });
    /*  else
        vipViewStore.saveRodamap({
          key: event.data.number,
          field: event.colDef.field,
          value: event.value,
        });*/
  }

  const getContextMenu = (params: any) => [
    "copy",
    {
      name: "Экспорт в Excel",
      action: function () {
        const cols = colApi
          ?.getAllColumns()
          .map((v) => v.getColId())
          .filter((v) => !["id"].includes(v));
        params.api?.exportDataAsExcel({
          skipGroups: true,
          columnGroups: true,
          columnKeys: cols,
        });
      },
    },
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
  ];

  const onFilterChanged = (params: any) => {
    // console.log(gridApi?.getFilterInstance('tb').appliedModel);

    const model: any = gridApi?.getFilterModel();

    // console.log(mainViewStore.applyFilter.tb)
  };

  /* const defCol = {
    sortable: true,

  };
*/
  return useObserver(() => (
    <>
      <div style={{ flex: "1" }} className="ag-theme-alpine">
        {
          <AgGridReact
            columnDefs={columnDef}
            rowData={vipViewStore.data}
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
            getRowNodeId={(row: VipView) => row.id.toString()}
            rowSelection="multiple"
            groupSelectsChildren
            groupSelectsFiltered
            debug={false}
            modules={AllModules}
            enableCellTextSelection
            localeText={localeTextRu}
            onSelectionChanged={handleSelectionChanged}
            onCellEditingStopped={handleCellChange}
            suppressCopyRowsToClipboard={true}
            tooltipShowDelay={500}
            getContextMenuItems={getContextMenu}
            suppressRowClickSelection
            groupDefaultExpanded={1}
            //  rowMultiSelectWithClick={true}
            onFilterChanged={onFilterChanged}

            //suppressNoRowsOverlay={true}
          ></AgGridReact>
        }
      </div>

      <div style={{ display: "none" }}>{vipViewStore.state}</div>
    </>
  ));
};

export default VipGrid;
