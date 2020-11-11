import Popup from './Popup.js';
import Api from './Api.js';
import {errorPopup} from '../pages/index.js';

export default class PopupConfirmation extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }

  open(id, element){
    super.open();
    this._id = id;
    this._element = element;
  }

  setSumbitCallback(id, element){
    new Api().removeCard(id).then(card =>{
      console.log(card);
      element.remove();
      this.close();
    })
    .catch(()=> errorPopup.open());
    }
    
    setEventListeners(){
      super.setEventListeners();
      this._popup.querySelector('.popup__button_remove').addEventListener('click', event =>{
        event.preventDefault();
        this.setSumbitCallback(this._id, this._element);
      });
    }


}
