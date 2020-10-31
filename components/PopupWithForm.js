import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor({formSelector, popupSelector}, handleFormSubmit){
    super(popupSelector);
    this._form = formSelector;
    this._handleFormSubmit = handleFormSubmit;
  }
  

  _getInputValues(){
    this._inputList = this._form.querySelectorAll('.popup__input');    
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
      });    
    return this._inputValues;
  }

  close(){
    super.close();
    this._form.reset();
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', ()=>{
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());  
      this.close();   
    });
  }
  
}