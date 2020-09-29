'use strict';

const popups = document.querySelectorAll('.popup');
const profileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_form_profile');
const profileName = document.querySelector('.profile__name');
const profileBusiness = document.querySelector('.profile__business');
const authorInput = popupProfile.querySelector('.popup__input_place_name');
const businessInput = popupProfile.querySelector('.popup__input_place_business');
const closeProfileButton = popupProfile.querySelector('.popup__close_place_profile');
const cardButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_form_card');
const cardTemplate = document.querySelector('.elements__template').content;
const cardSection = document.querySelector('.elements');
const placeInputCard = popupCard.querySelector('.popup__input_place_place-name');
const sourceInputCard = popupCard.querySelector('.popup__input_place_source');
const closeCardButton = popupCard.querySelector('.popup__close_place_card');
const popupImage = document.querySelector('.popup_image');
const imagePlace = popupImage.querySelector('.popup__figcaption');
const imageSource = popupImage.querySelector('.popup__image');
const closeImageButton = popupImage.querySelector('.popup__close_place_image');

/*==============================modules============================*/
import {initialCards} from './const.js';

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
  cardButton.setAttribute('disabled', true);
  cardButton.classList.add('popup__button_disabled');
  
  openPopup(popupCard);
};

const handleSubmitCardForm = function(name, link){
  event.preventDefault();
  cardSection.prepend(getCardElement(name,link));
  closePopup(popupCard);
};

const getCardElement = function (name, link) {
  const container = cardTemplate.cloneNode(true);
  const place = container.querySelector('.element__title');
  const image = container.querySelector('.element__image');
  const like = container.querySelector('.element__like');
  const basket = container.querySelector('.element__basket');
  const element = container.querySelector('.element');

  place.textContent = name;
  image.src = link;
  image.alt = name;

  like.addEventListener('click', () => {
    likeCard(like);
  });
  basket.addEventListener('click', () => {
    element.remove();
  });
  image.addEventListener('click', () => {
    showImagePopup(name, link);
  });

  return container;
};

const likeCard = function (element) {
  element.classList.toggle('element__like_active');
};

const renderCards = function () {
  initialCards.forEach(item => {
    cardSection.append(getCardElement(item.name, item.link));
  });
};

renderCards();

popupCard.addEventListener("submit", ()=>{
  handleSubmitCardForm(placeInputCard.value, sourceInputCard.value);  
});

closeCardButton.addEventListener('click',()=>{
  closePopup(popupCard);
});


/*==============================imageReview============================*/
function showImagePopup(name, link) {
  openPopup(popupImage);
  imagePlace.textContent = name;
  imageSource.src = link;
  imageSource.alt = name;
}

closeImageButton.addEventListener('click', ()=>{
  closePopup(popupImage);
});

/*==============================commonFunctions============================*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapePopup);  
}

function closePopup(popup) {  
  popup.classList.remove('popup_opened');  
  document.removeEventListener('keydown', escapePopup);  
}

const escapePopup = function(event){    
  if(event.key === "Escape"){
    popups.forEach(popup =>{
      if(popup.classList.contains('popup_opened')){
        closePopup(popup);
      }
    });
  }  
};

function closePopupOutside(){
  popups.forEach(popup => {
    popup.addEventListener('click', event =>{
      if(event.target === event.currentTarget){
        closePopup(popup);
      }
    });    
  });
}
closePopupOutside();


/*==============================eventListeners============================*/
profileButton.addEventListener('click', showProfilePopup);
cardButton.addEventListener('click', showCardPopup);

