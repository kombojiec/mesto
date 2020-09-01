'use strict';

let  editProfile = document.querySelector('.profile__edit-button');
let  page = document.querySelector('.page');
let  popup = document.querySelector('.popup');
let  popupContainer = popup.querySelector('.popup__container');
let  closeProfile = popup.querySelector('.popup__close');
let  profileName = document.querySelector('.profile__name');
let  profileBusiness = document.querySelector('.profile__business');
let  profileInputName = document.querySelector('.popup__input_place_name');
let  profileInputBusiness = document.querySelector('.popup__input_place_business');
let  popupButton = popupContainer.querySelector('.popup__button');

/*==============Profile window=============*/ 
function editProfileOpen(){
  popup.classList.add('popup_opened');
  profileInputName.value = profileName.textContent;
  profileInputBusiness.value = profileBusiness.textContent;
}

function editProfileClose(){
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(){
  event.preventDefault();   
  profileName.textContent = profileInputName.value; 
  profileBusiness.textContent = profileInputBusiness.value;
  editProfileClose();     
}
popup.addEventListener('submit', formSubmitHandler);

editProfile.addEventListener('click', editProfileOpen);
closeProfile.addEventListener('click', editProfileClose);

popup.addEventListener('click', (event)=>{  
  if(event.target == event.currentTarget){
    editProfileClose();
  }
});