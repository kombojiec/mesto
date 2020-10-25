'use strict';

/*==============================modules============================*/
import {initialCards, formObject} from './objects.js';
import Card from './card.js';
import FormValidator from './validation.js';
import {openPopup, closePopup, closePopupOutside} from './utils.js';

/*==============================variables============================*/
const profileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_form_profile');
const profileName = document.querySelector('.profile__name');
const profileBusiness = document.querySelector('.profile__business');
const authorInput = popupProfile.querySelector('.popup__input_place_name');
const businessInput = popupProfile.querySelector('.popup__input_place_business');
const closeProfileButton = popupProfile.querySelector('.popup__close_place_profile');
const cardButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_form_card');
const cardTemplate = document.querySelector('.elements__template');
const cardSection = document.querySelector('.elements');
const placeInputCard = popupCard.querySelector('.popup__input_place_place-name');
const sourceInputCard = popupCard.querySelector('.popup__input_place_source');
const closeCardButton = popupCard.querySelector('.popup__close_place_card');
const popupImage = document.querySelector('.popup_image');
const closeImageButton = popupImage.querySelector('.popup__close_place_image');
const forms = document.querySelectorAll(formObject.formSelector);

/*==============================editProfile============================*/
authorInput.value = profileName.textContent;
businessInput.value = profileBusiness.textContent;

const showProfilePopup = function () { 
  authorInput.value = profileName.textContent;
  businessInput.value = profileBusiness.textContent;  
  openPopup(popupProfile);  
};

const handleSubmitProfileForm = function() {
  event.preventDefault();
  profileName.textContent = authorInput.value;
  profileBusiness.textContent = businessInput.value;
  closePopup(popupProfile);
};

popupProfile.addEventListener('submit', () => {
  handleSubmitProfileForm();
});

closeProfileButton.addEventListener('click',(event)=>{
  closePopup(popupProfile);
});

/*==============================addCards============================*/
const showCardPopup = function(){  
  const cardButton = popupCard.querySelector('.popup__button');
  popupCard.querySelector('.popup__form').reset(); 
  formCardValidator.disableButton(cardButton);
  openPopup(popupCard);
};

const renderCards = function () {
  initialCards.forEach(item => {
    const card = new Card(item.name,item.link, cardTemplate);
    cardSection.append(card.createCardElement());
  });
};

renderCards();

popupCard.addEventListener("submit", ()=>{
  event.preventDefault();
  const card = new Card(placeInputCard.value, sourceInputCard.value, cardTemplate);  
  cardSection.prepend(card.createCardElement()); 
  closePopup(popupCard); 
});

closeCardButton.addEventListener('click',()=>{
  closePopup(popupCard);
});

/*==============================validationForms============================*/
  const formProfileValidator = new FormValidator(formObject, forms[0]);
  formProfileValidator.enableValidation();
  const formCardValidator = new FormValidator(formObject, forms[1]);
  formCardValidator.enableValidation();

/*==============================commonFunctions============================*/
closePopupOutside(); 

/*==============================eventListeners============================*/
profileButton.addEventListener('click', showProfilePopup);
cardButton.addEventListener('click', showCardPopup);
closeImageButton.addEventListener('click', ()=>{
  closePopup(popupImage);
});