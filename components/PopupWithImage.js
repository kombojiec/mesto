export default class  PopupWidthImage extends Popup{
  constructor(){

  }

  open(link, name){
    super.open();  
    this._image = this._popup.querySelector('popup__image');
    this._image.src = link;
    this._image.alt = name;
    this._image.querySelector('popup__figcaption').textContent = name;    
  }

}