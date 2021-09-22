import React from "react";
import socketService from "../services/socket-service";

import {
  AuthStore,
  AuthSocketStore,
  TemplateStore,
  ImportStore,
  ImportVipStore,
  MainViewStore,
  RefreshRequestStore,
  RequestLogsStore,
  AppStore,
  VipViewStore,
} from "../stores/";

const storesContext = React.createContext({
  authStore: new AuthStore(socketService),
  authSocketStore: new AuthSocketStore(),
  templateStore: new TemplateStore(socketService),
  importStore: new ImportStore(socketService),
  importVipStore: new ImportVipStore(socketService),
  mainViewStore: new MainViewStore(socketService),
  refreshRequestStore: new RefreshRequestStore(socketService),
  appStore: new AppStore(socketService),
  requestLogsStore: new RequestLogsStore(socketService),
  vipViewStore: new VipViewStore(socketService),
});

export default storesContext;
