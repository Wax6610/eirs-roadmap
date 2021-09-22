import { action, decorate, observable } from "mobx";
import RequestState from "../../types/request-state";
import { SocketService } from "../../services/socket-service";
import { RequestSuccessResult } from "../../components/dialogs/refresh-request/types/request-success-result";

const emptySuccessResult: RequestSuccessResult = {
  checkFailedList: [],
  created: [],
};
class RefreshRequestStore {
  constructor(private readonly socketService: SocketService) {}
  @observable state: RequestState = RequestState.init;
  @observable result: RequestSuccessResult = emptySuccessResult;
  @observable selectedTemplate: number = 0;
  @observable selectedSerial: string[] = [];
  @observable isDialogOpen: boolean = false;

  @action openDialog(templateId: number) {
    if (!Number.isInteger(templateId)) return;
    this.selectedTemplate = templateId;
    this.isDialogOpen = true;
  }

  @action closeDialog() {
    this.state = RequestState.init;
    this.isDialogOpen = false;
    //this.selectedSerial = [];
  }

  @action sendRequest(replace: boolean, remote: boolean) {
    this.state = RequestState.request;
    this.result = emptySuccessResult;

    // Привязка к БД
    // 12 , 16 - запросы к новой точки из вип всп
    if ([12,16].includes(this.selectedTemplate) )
      this.socketService.vipRequest({
        template: this.selectedTemplate,
        number: this.selectedSerial,
        replace,
        remote,
      });
    else
      this.socketService.refreshRequest({
        template: this.selectedTemplate,
        number: this.selectedSerial,
        replace,
        remote,
      });
  }

  @action requestError() {
    this.state = RequestState.failed;
  }

  @action requestSuccess(data: RequestSuccessResult) {
    this.result = data;
    this.state = RequestState.success;
  }

  @action setSelectedSerial(serial: string[]) {
    this.selectedSerial = serial;
  }
}

export default RefreshRequestStore;
