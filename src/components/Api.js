import {errorPopup} from '../pages/index.js';

export default class Api {
  constructor() {
    this._cohort = 'cohort-17';
    this._authorization = '41783898-48ae-4927-9db7-0ae982096860';
    this._url = `https://mesto.nomoreparties.co/v1/${this._cohort}`;
  }

  //Получение данных пользователя
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

  // Установка данных пользователя
  setUser(data){
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch(error => {
      console.error(`There is some error ${error}`);
    });
  }

  // Получение массива карточек
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
      .catch(error => {
        console.error(`There is some error ${error}`);
      });
  }

  // Добавлнение новой карточки
  addCard(name, link){
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch(error => {
    });
  }


  // Удаление карточки
  removeCard(id){
    return fetch(this._url + '/cards/' + id, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },      
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch(error => {
      console.error(`There is some error ${error}`);
    });
  }

  // Добавление лайка
  addLike(id){
    return fetch(this._url + '/cards/likes/' + id, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },      
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch(error => {
      console.error(`There is some error ${error}`);
    });
  }

  // Удаление лайка
  removeLike(id){
    return fetch(this._url + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },      
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch(error => {
      console.error(`There is some error ${error}`);
    });
  }

  // Смена аватара
  changeAvatar(url){
    return fetch(this._url + '/users/me/avatar' , {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },      
      body: JSON.stringify({
        avatar: url,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch(error => {
      console.error(`There is some error ${error}`);
    });
  }
  

}