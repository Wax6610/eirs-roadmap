import { action, observable } from "mobx";
import { SocketService } from "../services/socket-service";

class AppStore {
  constructor(private readonly socketService: SocketService) {}
  @observable tab: number = 0;

  @action setTab(tab: number) {
    this.tab = tab;
  }
}

export default AppStore;
