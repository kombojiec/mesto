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
const elements = document.querySelector('.elements');
const placeInputCard = popupCard.querySelector('.popup__input_place_place-name');
const sourceInputCard = popupCard.querySelector('.popup__input_place_source');
const closeCardButton = popupCard.querySelector('.popup__close_place_card');
const popupImage = document.querySelector('.popup_image');
const imagePlace = popupImage.querySelector('.popup__figcaption');
const imageSource = popupImage.querySelector('.popup__image');
const closeImageButton = popupImage.querySelector('.popup__close_place_image');

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

/*==============================editProfile============================*/
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

closeProfileButton.addEventListener('click',()=>{
  closePopup(popupProfile);
});


/*==============================addCards============================*/
const showCardPopup = function(){  
  placeInputCard.value = "";
  sourceInputCard.value = "";  
  openPopup(popupCard);
};

const handleSubmitCardForm = function(name, link){
  event.preventDefault();
  elements.prepend(createCard(name,link));
  closePopup(popupCard);
};

const createCard = function (name, link) {
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
    elements.append(createCard(item.name, item.link));
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
}

function closePopup(popup) {  
  popup.classList.remove('popup_opened');    
}

/*==============================eventListeners============================*/
profileButton.addEventListener('click', showProfilePopup);
cardButton.addEventListener('click', showCardPopup);