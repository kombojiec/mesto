import {Api} from './Api.js';

export default class UserInfo{
  constructor(data){
    this._name = document.querySelector(data.name);
    this._business = document.querySelector(data.business);
    this._avatar = document.querySelector(data.avatar);
  }

  getUserInfo(){
    this._infoValues = {};
    this._infoValues.name = this._name.textContent;
    this._infoValues.business = this._business.textContent;
    return this._infoValues;
  }
  
  setUserInfo(){
    this._infoData = new Api().getUser();
    this._infoData.then(data => {
      this._name.textContent = data.name;
      this._business.textContent = data.about;
      this._avatar.src = data.avatar;
    });
  }
}
