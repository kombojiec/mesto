import {removePopup} from '../pages/index.js';
import {api} from '../utiles/constants.js';
import {ownerInfo} from '../utiles/constants.js';


class Card{
  constructor(name, link, like, id, ownerInfoId, 
              cardId, template, handleCardClick, 
              removeLike, addLike){
    this._name = name;
    this._link = link;
    this._like = like; //массив 
    this._userId = ownerInfoId;
    id === this._userId?
    this._id = true: this._id = false;
    this._cardId = cardId;
    this._template = template;  
    this._popup = document.querySelector('.popup_image');
    this._popupFigureImage = document.querySelector('.popup__image');
    this._handleCardClick = handleCardClick;
    this._removeLike = removeLike;
    this._addLike = addLike;
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
        removePopup.open(this._cardId, this._element);
      });
    }else{
      this._basket.style.display="none";
    }    
    this._element.querySelector('.element__like').addEventListener('click', ()=>{
      this._changeLike(this._cardId);
    });
    this._element.querySelector('.element__image').addEventListener('click', ()=>{
      this._handleCardClick(this._name, this._link);
    });
  }

  _removeCard(){
    this._element.remove();
    this._element = null;
  }

  // Проверка на наличие личного лайка
  _checkOwnLike(){
    this._like.forEach(like => {
      if(like._id === this._userId){
        this._likeElement.classList.add('element__like_active');
      }
    });
  }

  toggleLikeData(value){
    this._likeValue = this._element.querySelector('.element__like-counter');
    this._likeElement.classList.toggle('element__like_active');
    this._likeValue.textContent = value; 
  }

  _changeLike(){
    if(this._likeElement.classList.contains('element__like_active')){  
      this._removeLike(this._cardId);      
    }else{    
      this._addLike(this._cardId);
    }
  }

  createCardElement(){
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._likeElement = this._element.querySelector('.element__like');  
    this._checkOwnLike();
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__like-counter').textContent = this._like.length;
    return this._element;
  }  
}

export default Card;