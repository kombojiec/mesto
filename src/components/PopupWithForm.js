import Popup from './Popup.js';
import {
  changeButtonValue
} from '../pages/index.js';

export default class PopupWithForm extends Popup {
  constructor({
    formElement,
    popupSelector
  }, handleFormSubmit) {
    super(popupSelector);
    this._form = formElement;
    this._handleFormSubmit = handleFormSubmit;
  }


  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      changeButtonValue(this._form, 'Сохранение');
      this._handleFormSubmit(this._getInputValues());
    });
  }

}