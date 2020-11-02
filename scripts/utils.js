function openPopup(popup) {
  popup.classList.add('popup_opened');
  // document.addEventListener('keydown', escapePopup);    
}

function closePopup(popup) {  
  popup.classList.remove('popup_opened');  
  // document.removeEventListener('keydown', escapePopup);  
}

// const escapePopup = function(event){ 
//   if(event.key === "Escape"){
//         closePopup(document.querySelector('.popup_opened'));
//   }  
// };

function closePopupOutside(){ 
  // document.querySelectorAll('.popup').forEach(popup => { 
  //   popup.addEventListener('click', event =>{ 
  //     if(event.target === event.currentTarget){ 
  //       closePopup(popup); 
  //     } 
  //   });     
  // }); 
}

export {openPopup, closePopup,  closePopupOutside};
