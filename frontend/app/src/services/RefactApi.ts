export default class FetchData {
  private readonly _root: string;

  constructor() {
    this._root = "http://localhost:8000/";
  }

  public request(url: string, method: string, data: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let options = {
        method: method,
        headers: {
          "Content-Type": "Application/Json",
        },
        body: method != "GET" ? JSON.stringify(data) : "",
      };
      fetch(this._root + url, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Fallo" + response.status);
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

// const fetchDataApi = new FetchData();
// const dataPrint = async () => {
//   const response = await fetchDataApi.request("users/login", "POST", {
//     username: "green",
//     password: "admin1234",
//   });
//   return response;
// };
