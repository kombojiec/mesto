'use strict';

const popups = document.querySelectorAll('.popup');
const profileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_form_profile');
const profileName = document.querySelector('.profile__name');
const profileBusiness = document.querySelector('.profile__business');
const cardButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_form_card');
const cardTemplate = document.querySelector('.elements__template').content;
const elements = document.querySelector('.elements');
const placeInputCard = popupCard.querySelector('.popup__input_place_place-name');
const sourceInputCard = popupCard.querySelector('.popup__input_place_source');
const popupImage = document.querySelector('.popup_image');
const closePopupButtons = document.querySelectorAll('.popup__close');

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
  const name = popupProfile.querySelector('.popup__input_place_name');
  const business = popupProfile.querySelector('.popup__input_place_business');

  name.value = profileName.textContent;
  business.value = profileBusiness.textContent;

  openPopup(popupProfile);

  popupProfile.addEventListener('submit', () => {
    handleSubmitProfileForm(name, business);
  });
};

const handleSubmitProfileForm = function (name, business) {
  event.preventDefault();
  profileName.textContent = name.value;
  profileBusiness.textContent = business.value;
  closePopup();
};


/*==============================addCards============================*/
const showCardPopup = function(){  
  placeInputCard.value = "";
  sourceInputCard.value = "";  
  openPopup(popupCard);
};

const handleSubmitCardForm = function(name, link){
  event.preventDefault();
  elements.prepend(createCard(name,link));
  closePopup();
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



/*==============================imageReview============================*/
function showImagePopup(name, link) {
  openPopup(popupImage);
  const place = popupImage.querySelector('.popup__figcaption');
  const source = popupImage.querySelector('.popup__image');
  place.textContent = name;
  source.src = link;
  source.alt = name;
}

/*==============================commonFunctions============================*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popups.forEach(item => {
    item.classList.remove('popup_opened');
  });
}

/*==============================eventListeners============================*/
profileButton.addEventListener('click', showProfilePopup);
cardButton.addEventListener('click', showCardPopup);
closePopupButtons.forEach(item =>{
  item.addEventListener('click', closePopup);
});