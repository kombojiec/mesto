'use strict';

/*==============================modules============================*/
import {initialCards, formObject, profileButton, 
        authorInput, businessInput, 
        cardButton, cardTemplate, cardSection,
        forms} from '../utiles/constants.js';
import Card from '../utiles/card.js';
import FormValidator from '../utiles/validation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


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


