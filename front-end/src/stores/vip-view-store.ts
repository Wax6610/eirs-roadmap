import { action, decorate, observable } from "mobx";
import RequestState from "../types/request-state";
import { SocketService } from "../services/socket-service";

class VipViewStore {
  constructor(private readonly socketService: SocketService) {}

  @observable state: RequestState = RequestState.init;
  @observable data: any[] = [];

  @action loadData(filterNum = 0) {
    this.data = [];
    this.state = RequestState.request;
    this.socketService.getVipView();
  }

  @action updateDataAfterLoad(data: any) {
    this.data = data;
    console.log(data);
    this.state = RequestState.success;
  }

  @action loadError() {
    this.state = RequestState.failed;
    this.data = [];
  }
/*
  @action saveRodamap(data: any) {
    this.socketService.updateVip(data);
  }*/

  @action saveMain(data: any) {
    this.socketService.updateVip(data);
  }
}

export default VipViewStore;
