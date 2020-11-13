import Popup from './Popup.js';

export default class PopupConfirmation extends Popup{
  constructor(popupSelector, setSumbitCallback){
    super(popupSelector);
    this._setSumbitCallback = setSumbitCallback;
  }

  open(id, element){
    super.open();
    this._id = id;
    this._element = element;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popup.querySelector('.popup__button_remove').addEventListener('click', event =>{
      event.preventDefault();
      this._setSumbitCallback(this._id, this._element);
    });
  }

}
