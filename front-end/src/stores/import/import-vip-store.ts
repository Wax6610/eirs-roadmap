import { action, observable } from "mobx";
import RequestState from "../../types/request-state";
import { SocketService } from "../../services/socket-service";

class ImportVipStore {
  constructor(private readonly socketService: SocketService) {}
  @observable state: RequestState = RequestState.init;
  @observable isDialogOpen: boolean = false;

  @action openDialog() {
    this.isDialogOpen = true;
  }
  @action closeDialog() {
    this.state = RequestState.init;
    this.isDialogOpen = false;
  }

  @action sendFile(data: any) {
    this.state = RequestState.request;
    this.socketService.importVip(data);
  }

  @action importError() {
    this.state = RequestState.failed;
  }
}

export default ImportVipStore;
