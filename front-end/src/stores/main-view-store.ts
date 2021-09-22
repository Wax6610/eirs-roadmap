import { action, decorate, observable } from "mobx";
import RequestState from "../types/request-state";
import { SocketService } from "../services/socket-service";
import { MainView } from "../components/main-grid/types/main-view";

class MainViewStore {
  constructor(private readonly socketService: SocketService) {}


  @observable state: RequestState = RequestState.init;
  @observable data: MainView[] = [];
  // Дата синхронизации данных из АПи и внешней БД
  @observable syncDate: {apiSyncDate : Date | null, dbSyncDate : Date|null} = {apiSyncDate : null, dbSyncDate : null};
  @observable mode: string = "all"; // выбор какой набор полей мы смотрим
  @observable filter: string = "all"; // костыль для фильтра (что бы не грузить через АПИ)
  @observable showNameFilter = false; // Отображение филтра по имени
  @observable nameFilter: string[] = []; //Список данных для фильтра по имени

  @action loadData(filterNum = 0) {
    this.data = [];
    this.state = RequestState.request;
    this.socketService.getMainView(filterNum);
  }

  @action updateDataAfterLoad(data: any) {
    this.data = data;
    this.state = RequestState.success;
  }

  @action loadError() {
    this.state = RequestState.failed;
    this.data = [];
  }

  @action saveRodamap(data: any) {
    this.socketService.saveRoadmap(data);
  }

  @action saveMain(data: any) {
    this.socketService.saveMain(data);
  }
}

export default MainViewStore;
