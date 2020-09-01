'use strict';

const editProfile = document.querySelector('.profile__edit-button'),
    page = document.querySelector('.page'),
    popup = document.querySelector('.popup'),
    popupContainer = popup.querySelector('.popup__container'),
    closeProfile = popup.querySelector('.popup__close'),  
    profileName = document.querySelector('.profile__name'),
    profileBusiness = document.querySelector('.profile__business'),
    profileInputName = document.querySelector('.popup__input_place_name'),
    profileInputBusiness = document.querySelector('.popup__input_place_business'),  
    popupButton = popupContainer.querySelector('.popup__button');

/*==============Profile window=============*/ 
function editProfileToggle() {  
  popup.classList.toggle('popup_opened');
  page.classList.toggle('page_overflow_hidden');
}
editProfile.addEventListener('click', editProfileToggle);
closeProfile.addEventListener('click', editProfileToggle);
popup.addEventListener('click', (event)=>{  
  if(event.target == event.currentTarget){
    editProfileToggle();
  }
});

function formSubmitHandler(){
  event.preventDefault();   
  profileName.textContent = profileInputName.value; 
  profileBusiness.textContent = profileInputBusiness.value;
  editProfileToggle();     
}
popup.addEventListener('submit', formSubmitHandler);