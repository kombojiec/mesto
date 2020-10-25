export default class Popup{
  constructor(popupSelector){
    this._popup = popupSelector;    
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event){
    if(event.key === "Escape"){
      this.closePopup();
    }
  }

  setEventListeners(){
    this._popup.addEventListener('click', (event) => {
      this._handleEscClose(event);
      if(event.target.classList.contains(this._popup)){
        this.close();
      }
    });
    this._popup.querySelector('.close__popup').addEventListener('click', this.close);
  }

}