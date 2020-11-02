import Popup from './Popup.js';

// export default class  PopupWithImage extends Popup{
//   constructor(popupSelector, name, link){
//     super(popupSelector);
//     this._name = name;
//     this._link = link;
//   }

//   open(){
//     super.open();  
//     this._image = this._popup.querySelector('.popup__image');
//     this._image.src = this._link;
//     this._image.alt = this._name;
//     this._popup.querySelector('.popup__figcaption').textContent = this._name;    
//   }

// }

export default class  PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }

  open(name, link){
    super.open();  
    this._image = this._popup.querySelector('.popup__image');
    this._image.src = link;
    this._image.alt = name;
    this._popup.querySelector('.popup__figcaption').textContent = name;    
  }

}