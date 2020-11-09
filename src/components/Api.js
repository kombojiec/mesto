export const serverData = {
  cohort: 'cohort-17',
  authorization: '41783898-48ae-4927-9db7-0ae982096860',
  // url : `https://mesto.nomoreparties.co/v1/${this.cohort}/cards`,  
};

export class Api {
  constructor() {
    this._cohort = 'cohort-17';
    this._authorization = '41783898-48ae-4927-9db7-0ae982096860';
    this._url = `https://mesto.nomoreparties.co/v1/${this._cohort}`;
  }

  getUser() {
    return fetch(this._url + '/users/me', {
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then(res => {
        return res;
      })
      .catch(error => {
        console.error(`There is some error ${error}`);
      });
  }

  getCards() {
    return fetch(this._url + '/cards', {
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      // .then(res => {
      //   return res;
      // })
      .catch(error => {
        console.error(`There is some error ${error}`);
      });
  }


}