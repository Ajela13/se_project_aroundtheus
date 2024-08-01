export default class Api {
  constructor() {
    this.baseUrl = "https://around-api.en.tripleten-services.com/v1";
    this.header = {
      authorization: "e0de40de-7d64-4892-9ff7-934d3c5c1077",
      "Content-Type": "application/json",
    };
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkRes);
  }

  _checkRes() {
    (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    };
  }

  getUserInfo() {
    console.log("fuck");
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.header,
    });
  }
}
