import {removePopup} from '../pages/index.js';
import Api from './Api.js';


class Card{
  constructor(name, link, like, id, cardId, template, handleCardClick, confirmRemoveCard){
    this._name = name;
    this._link = link;
    like? this._like = like: this._like ="";
    id === "4ca33b1025ae9067ff8a99f8"?
    this._id = true: this._id = false;
    this._cardId = cardId;
    this._template = template;  
    this._popup = document.querySelector('.popup_image');
    this._popupFigureImage = document.querySelector('.popup__image');
    this._handleCardClick = handleCardClick;
    this._confirmRemoveCard = confirmRemoveCard.bind(this);
  }

  _getTemplate(){
    const element = this._template
      .content
      .querySelector('.element')
      .cloneNode(true);
      return element;        
  }

  _setEventListeners(){
    this._basket = this._element.querySelector('.element__basket');
    if(this._id){
      this._basket.addEventListener('click', () =>{
        this._confirmRemoveCard(this._cardId, this._element);
      });
    }else{
      this._basket.style.display="none";
    }    
    this._element.querySelector('.element__like').addEventListener('click', ()=>{
      this._toggleLike();
    });
    this._element.querySelector('.element__image').addEventListener('click', ()=>{
      this._handleCardClick(this._name, this._link);
    });
  }

  _removeCard(){
    this._element.remove();
    this._element = null;
  }

  _toggleLike(){
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  createCardElement(){
    this._element = this._getTemplate();
    this._setEventListeners();
    this._image = this._element.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__like-counter').textContent = this._like;
    return this._element;
  }  
}

export default Card;