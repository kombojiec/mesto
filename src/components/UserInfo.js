export default class UserInfo{
  constructor(data){
    this._name = document.querySelector(data.name);
    this._business = document.querySelector(data.business);
  }

  getUserInfo(){
    this._infoValues = {};
    this._infoValues.name = this._name.textContent;
    this._infoValues.business = this._business.textContent;
    return this._infoValues;
  }
  
  setUserInfo(data){
    this._name.textContent = data['edit-name'];
    this._business.textContent = data['edit-business'];
  }
}