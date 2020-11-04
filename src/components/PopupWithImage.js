import Popup from './Popup.js';

export default class  PopupWithImage extends Popup{
  constructor({popupSelector, imageSelector, imageFigcaption}){
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._imageFigcaption = this._popup.querySelector(imageFigcaption);

  }

  open(name, link){
    super.open();  
    this._image.src = link;
    this._image.alt = name;
    this._imageFigcaption.textContent = name;
  }

}