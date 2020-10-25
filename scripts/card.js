import {openPopup, closePopup} from './utils.js';

class Card{
  constructor(name, link, template){
    this._name = name;
    this._link = link;
    this._template = template;  
    this._popup = document.querySelector('.popup_image');
    this._popupFigureImage = document.querySelector('.popup__image');
  }

  _getTemplate(){
    const element = this._template
      .content
      .querySelector('.element')
      .cloneNode(true);
      return element;        
  }

  _setEventListeners(){
    this._element.querySelector('.element__basket').addEventListener('click', () =>{
      this._removeCard();
    });
    this._element.querySelector('.element__like').addEventListener('click', ()=>{
      this._toggleLike();
    });
    this._element.querySelector('.element__image').addEventListener('click', ()=>{
      this._showPicturePopup();
    });
  }

  _removeCard(){
    this._element.remove();
    this._element = null;
  }

  _toggleLike(){
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _showPicturePopup(){
    this._popupFigureImage.src = this._link;
    this._popupFigureImage.alt = this._name;
    this._popup.querySelector('.popup__figcaption').textContent = this._name;
    openPopup(this._popup);  
    this._popup.querySelector('.popup__close').addEventListener('click', ()=>{
      closePopup(this._popup);
    }); 
  }

  createCardElement(){
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }  
}

export default Card;