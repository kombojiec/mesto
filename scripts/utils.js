function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapePopup);  
  popup.addEventListener('click', event =>{
    if(event.target === event.currentTarget){
      closePopup(popup);
    }
  });
}

function closePopup(popup) {  
  popup.classList.remove('popup_opened');  
  document.removeEventListener('keydown', escapePopup);  
}

const escapePopup = function(event){ 
  const popups = document.querySelectorAll('.popup');   
  if(event.key === "Escape"){
    popups.forEach(popup =>{
      if(popup.classList.contains('popup_opened')){
        closePopup(popup);
      }
    });
  }  
};

export {openPopup, closePopup, escapePopup};

function disableButton(button){
  button.setAttribute('disabled', true);
}
export default disableButton;