type User = {
  token?: string;
  auth: boolean;
  user?: {
    id: number;
    username: string;
    email: string;
  };
  message: string;
};

export default class authUser {
  private static instance: authUser;
  private static _dataUser: User;
  private static _token: string;

  private constructor() {}

  private static init(): void {
    if (localStorage.getItem("dataSesion")) {
      const Session = JSON.parse(localStorage.getItem("dataSesion"));
      authUser._dataUser = Session;
      if (Session.auth) {
        authUser._token = Session.token;
      }
    } else {
      authUser._dataUser = {
        auth: false,
        message: "",
      };
      authUser._token = "";
    }
  }

  public static getInstance(): authUser {
    if (!this.instance) {
      this.init();
      this.instance = new authUser();
    }
    return this.instance;
  }

  get dataUser(): User {
    return authUser._dataUser;
  }

  get token(): string {
    return authUser._token;
  }
}
