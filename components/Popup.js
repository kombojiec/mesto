export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);    
  }

  open(){
    this._popup.classList.add('popup_opened');  
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(){    
    if(event.key === "Escape"){
      this.close();
      console.log(this);
    }
  }

  setEventListeners(){
    this._popup.addEventListener('click', (event) => {      
      if(event.target.classList.contains(this._popup)){
        // this.close();
        console.log(this._popup);
      }
    });
    this._popup.querySelector('.popup__close').addEventListener('click', ()=>{
      this.close();
    });
  }

}