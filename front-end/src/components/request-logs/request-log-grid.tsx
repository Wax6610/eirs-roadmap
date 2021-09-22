import React, { useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import { AgGridReact } from "@ag-grid-community/react";

import {
  AllModules,
  ColumnApi,
  GridApi,
  GridReadyEvent,
  StatusPanelDef,
  CellEditingStoppedEvent,
} from "@ag-grid-enterprise/all-modules";
import { localeTextRu } from "../main-grid/locale-text-ru";
import { GridColumns } from "./grid-columns";
import { useStores } from "../../hooks/use-stores";

function RequestLogGrid() {
  const { requestLogsStore } = useStores();

  const [gridApi, setGridApi] = React.useState<GridApi | undefined>();
  const [colApi, setColApi] = React.useState<ColumnApi | undefined>();
  //let colApi: ColumnApi | undefined;

  function handleGridReady(event: GridReadyEvent) {
    setGridApi(event.api);
    setColApi(event.columnApi);
  }

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

  return useObserver(() => (
    <div
      style={{ flex: "1", height: "500px", width: "100%" }}
      className="ag-theme-alpine"
    >
      {
        <AgGridReact
          columnDefs={GridColumns}
          rowData={requestLogsStore.data}
          floatingFilter={true}
          onGridReady={handleGridReady}
          //  onCellClicked={handleCellClick}
          enableSorting
          enableFilter
          enableColResize={true}
          statusBar={statusBar}
          getRowNodeId={(row: any) => row.id.toString()}
          // rowSelection="multiple"
          //  groupSelectsChildren
          // groupSelectsFiltered
          debug={false}
          modules={AllModules}
          enableCellTextSelection
          localeText={localeTextRu}
          suppressCopyRowsToClipboard={true}
          tooltipShowDelay={500}
          rowMultiSelectWithClick={true}
          // defaultColDef={{ hide: true }}
        ></AgGridReact>
      }
    </div>
  ));
}

export default RequestLogGrid;
