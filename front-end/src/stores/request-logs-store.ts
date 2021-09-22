import { action, decorate, observable } from "mobx";
import RequestState from "../types/request-state";
import { SocketService } from "../services/socket-service";

class RequestLogsStore {
  constructor(private readonly socketService: SocketService) {}
  state: RequestState = RequestState.init;
  isDialogOpen: boolean = false;
  data: any = [];

  openDialog() {
    this.socketService.getSmRequestLogs();
    this.state = RequestState.request;
    this.isDialogOpen = true;
  }

  getDataSuccess(data: any) {
    this.data = data;
    this.state = RequestState.success;
    console.log(data);
  }

  getDataFailed() {
    this.state = RequestState.failed;
  }
  closeDialog() {
    this.state = RequestState.init;
    this.isDialogOpen = false;
  }
}

decorate(RequestLogsStore, {
  state: observable,
  isDialogOpen: observable,
  data: observable,
  openDialog: action,
  closeDialog: action,
  getDataSuccess: action,
  getDataFailed: action,
});

export default RequestLogsStore;
