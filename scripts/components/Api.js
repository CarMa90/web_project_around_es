export default class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  getInitialCards() {
    // console.log(this.headers);
    return fetch(`${this.url}cards/`, { headers: this.headers }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getNewCard(options) {
    return fetch(`${this.url}cards/`, {
      headers: this.headers,
      body: options.body,
      method: options.method,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  handleCardLikes(options) {
    if (options.card.classList.contains("card__like-button_is-active")) {
      return fetch(
        `https://around-api.es.tripleten-services.com/v1/cards/${options.id}/likes`,
        {
          method: "DELETE",
          headers: this.headers,
        },
      ).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    } else if (
      !options.card.classList.contains("card__like-button_is-active")
    ) {
      return fetch(
        `https://around-api.es.tripleten-services.com/v1/cards/${options.id}/likes`,
        {
          method: "PUT",
          headers: this.headers,
        },
      ).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    }
  }

  deleteCard(options) {
    return fetch(`${this.url}cards/${options.cardId}`, {
      headers: this.headers,
      method: options.method,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this.url}users/me`, { headers: this.headers }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      },
    );
  }

  setUserInfo(options) {
    return fetch(`${this.url}users/me`, {
      headers: this.headers,
      method: options.method,
      body: options.body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  changeProfilePicture(options) {
    return fetch(`${this.url}users/me/avatar`, {
      headers: this.headers,
      method: options.method,
      body: options.body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
