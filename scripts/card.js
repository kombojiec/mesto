class Card{
  constructor(name, link, template){
    this._name = name;
    this._link = link;
    this._template = template;    
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
      this._showPicture();
    });
  }

  _removeCard(){
    this._element.remove();
  }

  _toggleLike(){
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _showPicture(){
    const popup = document.querySelector('.popup_image');
    popup.querySelector('.popup__image').src = this._link;
    popup.querySelector('.popup__image').alt = this._name;
    popup.querySelector('.popup__figcaption').textContent = this._name;
    popup.classList.add('popup_opened');    
  }

  createCardElement(){
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    console.log(this._element);
    return this._element;
  }  
}

export default Card;