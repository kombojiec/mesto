'use strict';

/*==============================modules============================*/
import {initialCards, formObject} from '../utiles/objects.js';
import Card from '../utiles/card.js';
import FormValidator from '../utiles/validation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


/*==============================variables============================*/
const profileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_form_profile');
// const profileName = document.querySelector('.profile__name');
// const profileBusiness = document.querySelector('.profile__business');
const authorInput = popupProfile.querySelector('.popup__input_place_name');
const businessInput = popupProfile.querySelector('.popup__input_place_business');
// const closeProfileButton = popupProfile.querySelector('.popup__close_place_profile');
const cardButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_form_card');
const cardTemplate = document.querySelector('.elements__template');
const cardSection = document.querySelector('.elements');
// const placeInputCard = popupCard.querySelector('.popup__input_place_place-name');
// const sourceInputCard = popupCard.querySelector('.popup__input_place_source');
// const closeCardButton = popupCard.querySelector('.popup__close_place_card');
const popupImage = document.querySelector('.popup_image');
// const closeImageButton = popupImage.querySelector('.popup__close_place_image');
const forms = document.querySelectorAll(formObject.formSelector);

/*==============================editProfile============================*/
const profileInfo = new UserInfo({
  name: '.profile__name',
  business: '.profile__business',
});

const showProfilePopup = new PopupWithForm({
  formSelector: forms[0],
  popupSelector: '.popup_form_profile',
},(data) => {
  profileInfo.setUserInfo(data);
});

profileButton.addEventListener('click', ()=>{
  authorInput.value = profileInfo.getUserInfo().name;
  businessInput.value = profileInfo.getUserInfo().business;
  showProfilePopup.open();
});

showProfilePopup.setEventListeners();


/*==============================addCards============================*/
const imagePopup = new PopupWithImage('.popup_image');
imagePopup.setEventListeners();
const handleCardClick = (name, link)=>{
  imagePopup.open(name, link);
};

const renderCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name,item.link, cardTemplate,  handleCardClick);
      
    renderCard.addItem(card.createCardElement());
  }
}, '.elements');

renderCard.renderItems();

const newPopup = new PopupWithForm({formSelector: forms[1],
  popupSelector: '.popup_form_card'}, 
  (inputData)=>{
    const card = new Card(inputData['card-name'], inputData['card-sourse'], cardTemplate, handleCardClick);  
    cardSection.prepend(card.createCardElement()); 
});

newPopup.setEventListeners();
cardButton.addEventListener('click', ()=>{
  newPopup.open();
  formCardValidator.disableButton(forms[1].querySelector('.popup__button'));
});

/*==============================validationForms============================*/
  const formProfileValidator = new FormValidator(formObject, forms[0]);
  formProfileValidator.enableValidation();
  const formCardValidator = new FormValidator(formObject, forms[1]);
  formCardValidator.enableValidation();


