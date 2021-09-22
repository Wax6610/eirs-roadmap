import { action, decorate, observable } from "mobx";

class AuthSocketStore {
  users: string[] = [];
  username: string = "";

  updateUsers(data: string[]) {
    this.users = data;
  }

  updateUser(username: string) {
    this.username = username;
  }
}

decorate(AuthSocketStore, {
  username: observable,
  users: observable,
  updateUsers: action,
  updateUser: action,
});

export default AuthSocketStore;
