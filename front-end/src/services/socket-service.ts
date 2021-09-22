import io from "socket.io-client";
import GatewayEvents from "../types/gateway-events";
import AuthUserDto from "../types/auth-user-dto";
import { api } from "../config";

/*
 *
 * Класс для работы  с сокетами
 * Для авторизации на сервере нам требуется токен, но в момент создания класса
 * токен у нас отсутсвует. Сервер настроен так, что дисконектит пользователя без токена
 * поэтому в общем  случае происходит инициализация, затем повторное соеднинение через ф-ю init()
 * к тому времени как будет работать init() токен уже будет получен
 * */
class SocketService {
  private baseUrl = api;
  private restartInterval: NodeJS.Timeout | null = null;
  public withToken: boolean = false;
  public socket: SocketIOClient.Socket;

  constructor() {
    const localStorageData: string | null = localStorage.getItem("user_data");

    let parsedData: AuthUserDto | null = null;

    if (localStorageData !== null) {
      parsedData = JSON.parse(localStorageData);
    }

    const token = parsedData !== null ? parsedData.token : "";

    if (token !== "") this.withToken = true;

    this.socket = io(this.baseUrl, {
      query: `token=${token}`,
      forceNew: false,
    });

    this.socket.on("disconnect", () => {
      this.restartInterval = setInterval(() => this.init(), 1000);
    });
  }

  public init() {
    const localStorageData: string | null = localStorage.getItem("user_data");
    if (localStorageData !== null) {
      const parsedData: AuthUserDto = JSON.parse(localStorageData);
      this.withToken = true;
      if (this.socket) {
        this.socket.disconnect();
      }
      this.socket = io(this.baseUrl, {
        query: `token=${parsedData.token}`,
        forceNew: false,
      });

      if (this.restartInterval) {
        clearInterval(this.restartInterval);
      }
    }
  }

  getTemplates() {
    this.socket.emit(GatewayEvents.USER_ASK_TEMPLATES);
  }

  import(data: any) {
    this.socket.emit(GatewayEvents.USER_ASK_IMPORT, data);
  }

  getTemplateCodes() {
    this.socket.emit(GatewayEvents.USER_ASK_TEMPLATE_CODES);
  }

  getMainView(data: any) {
    this.socket.emit(GatewayEvents.USER_ASK_MAIN_VIEW, data);
  }

  getVipView() {
    this.socket.emit(GatewayEvents.LOAD_VIP);
  }
  saveTemplate(data: any) {
    this.socket.emit(GatewayEvents.USER_ASK_SAVE_TEMPLATE, data);
  }
  refreshRequest(data: any) {
    this.socket.emit(GatewayEvents.USER_SEND_REFRESH_REQUEST, data);
  }

  sendPfRequest(data: any) {
    this.socket.emit(GatewayEvents.USER_SEND_PF_REQUEST, data);
  }

  getSmRequestLogs() {
    this.socket.emit(GatewayEvents.GET_SM_REQUEST);
  }

  saveRoadmap(data: any) {
    this.socket.emit(GatewayEvents.SAVE_ROADMAP, data);
  }

  getFilterData() {
    this.socket.emit(GatewayEvents.GET_FILTER_DATA);
  }

  importVip(data: any) {
    this.socket.emit(GatewayEvents.IMPORT_VIP, data);
  }

  saveMain(data: any) {
    this.socket.emit(GatewayEvents.SAVE_MAIN, data);
  }

  vipRequest(data: any) {
    this.socket.emit(GatewayEvents.VIP_REQUEST, data);
  }

  updateVip(data: any) {
    this.socket.emit(GatewayEvents.UPDATE_VIP, data);
  }
}

const socketService = new SocketService();
export default socketService;
export { SocketService };
