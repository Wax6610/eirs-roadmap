import { action, decorate, observable } from "mobx";
import RequestState from "../types/request-state";
import AuthUserDto from "../types/auth-user-dto";
import { SocketService } from "../services/socket-service";
import axios from "axios";
import * as https from "https";
class AuthStore {
  state: RequestState = RequestState.init;
  isOffline: boolean = false;
  data: AuthUserDto = {} as AuthUserDto;

  constructor(private readonly socketService: SocketService) {}

  async signIn() {

    try {
      const resp: Response = await fetch(
          "http://v-suo-12r2-04.ca.sbrf.ru/get_jwt/api/auth/get_token?appname=eirs_renovation",
        {
          method: "GET",
          credentials: "include",
          referrerPolicy: "origin-when-cross-origin",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (resp.ok === true) {
        const json: AuthUserDto | null = await resp.json();
        if (json !== null) {
          this.data = json;
          await localStorage.setItem("user_data", JSON.stringify(json));

          await this.delay(2000);
          this.state = RequestState.success;
          return;
        }
        this.state = RequestState.failed;
      } else this.state = RequestState.failed;
    } catch (e) {
      this.state = RequestState.failed;
    }
  }

  setOffline(state: boolean) {
    this.isOffline = state;
  }
  delay(time: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), time));
  }
}

decorate(AuthStore, {
  state: observable,
  data: observable,
  signIn: action,
  setOffline: action,
  isOffline: observable,
});

export default AuthStore;
