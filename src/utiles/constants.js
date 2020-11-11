// Import ====================================
import Card from '../components/card.js';
import {imagePopup} from '../pages/index.js';

// Arrays ====================================

const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];



// Objects==============================

const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'  
};


// Constants=================================

const profileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_form_profile');
const authorInput = popupProfile.querySelector('.popup__input_place_name');
const businessInput = popupProfile.querySelector('.popup__input_place_business');
const cardButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('.elements__template');
// const cardSection = document.querySelector('.elements');
const avatarContent = document.querySelector('.profile__avatar');
const avatarItem = document.querySelector('.profile__avatar-wrap');
const forms = document.querySelectorAll(formObject.formSelector);



// Functions======================
function createCard(item){
  const card = new Card(
    item.name,
    item.link, 
    item.likes,
    item.owner._id, 
    item._id,
    cardTemplate,  
    handleCardClick);
    return card;
}

const handleCardClick = (name, link)=>{
  imagePopup.open(name, link);
};

function changeButtonValue(form,text){
  form.querySelector('.popup__button').innerText = text;
}




// Export======================

export {initialCards, formObject, profileButton, 
  authorInput, businessInput, 
  cardButton, cardTemplate, /*cardSection,*/
  forms, avatarContent, avatarItem, createCard, 
  changeButtonValue};