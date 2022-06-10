class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }
  updateProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseData);
  }
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData);
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }
  changeLikeCardStatus(id, cardLikeStatus) {
    return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
      method: cardLikeStatus ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }
  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponseData);
  }
}

// const token = localStorage.getItem("jwt");
const api = new Api({
  baseUrl: "https://api.mestofront.students.nomoredomains.xyz",
  // headers: {
  //   Authorization: `Bearer ${token}`,
  //   "Content-Type": "application/json",
  // },
});

export default api;
