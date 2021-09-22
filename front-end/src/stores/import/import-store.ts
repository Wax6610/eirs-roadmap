import { action, decorate, observable } from "mobx";
import RequestState from "../../types/request-state";
import { SocketService } from "../../services/socket-service";

class ImportStore {
  constructor(private readonly socketService: SocketService) {}
  state: RequestState = RequestState.init;
  isDialogOpen: boolean = false;

  openDialog() {
    this.isDialogOpen = true;
  }
  closeDialog() {
    this.state = RequestState.init;
    this.isDialogOpen = false;
  }

  sendFile(data: any) {
    this.state = RequestState.request;
    this.socketService.import(data);
  }

  importError() {
    this.state = RequestState.failed;
  }
}

decorate(ImportStore, {
  state: observable,
  isDialogOpen: observable,
  openDialog: action,
  closeDialog: action,
  sendFile: action,
  importError: action,
});

export default ImportStore;
