import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LicenseManager } from "@ag-grid-enterprise/all-modules";
import generalTheme from "./themes/general-theme";
import { ThemeProvider } from "@material-ui/core";
import {key} from "./config";

LicenseManager.setLicenseKey(key);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={generalTheme}>
      <App />
    </ThemeProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
