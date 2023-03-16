import authUser from "../utils/auth";

const auth = authUser.getInstance();

/**
 * @description Api service to make requests to the server and get the response
 * */ export default class FetchData {
  private static instance: FetchData;
  private static _url: string;
  private static _token: string;

  private constructor() {}

  private static init(): void {
    FetchData._url = "http://localhost:8000/";
    FetchData._token = auth.dataUser.auth ? auth.token : "";
  }

  /**
   *  @description: Initialize an instance if it is not yet created
   *  and it guarantees that it will always be the same instance
   *  @returns {FetchData} instance of the class FetchData
   * */ public static getInstance(): FetchData {
    if (!this.instance) {
      this.init();
      this.instance = new FetchData();
    }

    return this.instance;
  }
  /**
   *  @description: Make a request to the server with the token
   * @param {string} url - url to make the request
   * @param {string} method - method to make the request
   * @param {object} body - body of the request
   * @returns {object} response of the request
   * */ async fetch(url: string, method: any, body: object): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + FetchData._token,
    };
    const response = await fetch(FetchData._url + url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    });
    const data = await response.json();
    return data;
  }

  /**
   * @description: Make a request to the server without the token
   * @param {string} url - url to make the request
   * @param {string} method - method to make the request
   * @param {object} body - body of the request
   * @returns {object} response of the request
   * */ async fetchWithoutToken(
    url: string,
    method: any,
    body: object
  ): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(FetchData._url + url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    });
    const data = await response.json();
    return data;
  }

  /**
   * @description: Make a request to the server without the token
   * @param {string} url - url to make the request
   * @param {string} method - method to make the request
   * @returns {object} response of the request
   * */ async fetchWithoutTokenAndBody(url: string, method: any): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(FetchData._url + url, {
      method: method,
      headers: headers,
    });
    const data = await response.json();
    return data;
  }
}
