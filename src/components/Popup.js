export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);  
    this._handleEscClose = this._handleEscClose.bind(this);  
    this._closeOverlay = this._closeOverlay.bind(this);
  }

  open(){
    this._popup.classList.add('popup_opened');  
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._closeOverlay);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._closeOverlay);
  }

  _handleEscClose(event){    
    if(event.key === "Escape"){
      this.close();
    }
  }

  _closeOverlay(event){
    if(event.target === event.currentTarget){
      this.close();
    }
  }

  setEventListeners(){   
    this._popup.querySelector('.popup__close').addEventListener('click', ()=>{
      this.close();
    });
  }  

}