// Import ====================================
import Card from '../components/card.js';
import {imagePopup, errorPopup} from '../pages/index.js';
import Api from '../components/Api.js';

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

const ownerInfo = {
  id: "4ca33b1025ae9067ff8a99f8",
  cohort: 'cohort-17',
  authorization: '41783898-48ae-4927-9db7-0ae982096860',
  url: 'https://mesto.nomoreparties.co/v1/cohort-17',
};


// Constants=================================
const api = new Api(ownerInfo.cohort, ownerInfo.authorization, ownerInfo.url);
const profileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_form_profile');
const authorInput = popupProfile.querySelector('.popup__input_place_name');
const businessInput = popupProfile.querySelector('.popup__input_place_business');
const cardButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('.elements__template');
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
    ownerInfo.id,
    item._id,
    cardTemplate,  
    handleCardClick,
    removeLike,
    addLike);
    return card;
}

const handleCardClick = (name, link)=>{
  imagePopup.open(name, link);
};

function changeButtonValue(form,text){
  form.querySelector('.popup__button').innerText = text;
}

function consoleError(error){
  console.error(`Что-то пошло не так... Ошибка ${error}`);
}

function setSumbitCallback(id, element){
  api.removeCard(id)
  .then(() =>{
    element.remove();
    this.close();
  })
  .catch((error)=> {
    errorPopup.open();
    consoleError(error);
  });
  }

  function removeLike(id){
    api.removeLike(id)
    .then(response => {     
      this.toggleLikeData(response.likes.length);
    });
  }

  function addLike(id){
    api.addLike(id)
    .then(response => {     
      this.toggleLikeData(response.likes.length);
    });
  }




// Export======================

export {api, initialCards, 
  formObject,   profileButton, 
  authorInput, businessInput, 
  cardButton, cardTemplate,
  forms, avatarContent, avatarItem, 
  createCard, changeButtonValue, 
  consoleError, setSumbitCallback};