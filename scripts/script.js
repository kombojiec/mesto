'use strict';

const  profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const  popup = document.querySelector('.popup');
const  profileName = document.querySelector('.profile__name');
const  profileBusiness = document.querySelector('.profile__business');
const elements = document.querySelector('.elements');
const formProfileTemplate = document.querySelector('.popup__template_value_profile').content;
const formCardTemplate = document.querySelector('.popup__template_value_card').content;
const cardTemplate = document.querySelector('.elements__template').content;
const imageTemplate = document.querySelector('.popup__template_value_image').content;

const initialCards = [
  {
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
const showProfilePopup = function(){
  const content = formProfileTemplate.cloneNode(true);
  const container = content.querySelector('.popup__container');  
  const name = container.querySelector('.popup__input_place_name');
  const business = container.querySelector('.popup__input_place_business');
  const close = container.querySelector('.popup__close');

  popup.innerHTML = "";  
  name.value = profileName.textContent;
  business.value = profileBusiness.textContent;

  openPopup();

  container.addEventListener('submit', ()=>{
    profileFormSubmitHandler(name, business);
  });
  close.addEventListener('click', closePopup);
  
  popup.append(container);
};

const profileFormSubmitHandler = function(name, business){
  event.preventDefault();
  profileName.textContent = name.value;
  profileBusiness.textContent = business.value;
  closePopup();
};


/*==============================addCards============================*/
const createCard = function(name, link){  
  const container = cardTemplate.cloneNode(true);
  const place = container.querySelector('.element__title');
  const image = container.querySelector('.element__image');
  const like = container.querySelector('.element__like');
  const basket = container.querySelector('.element__basket');
  const element = container.querySelector('.element');

  place.textContent = name;
  image.src = link;
  image.alt = name;

  like.addEventListener('click', ()=>{
    likeCard(like);
  });
  basket.addEventListener('click', ()=>{
    element.remove();
  });
  image.addEventListener('click', ()=>{
    createPopupImage(name, link);
  });

  elements.prepend(container);
};

const renderCards = function(){
  initialCards.forEach(item =>{
    createCard(item.name, item.link);
  });  
};

renderCards();

const showCardPopup = function (){  
  const content = formCardTemplate.cloneNode(true);
  const container = content.querySelector('.popup__container');  
  const name = content.querySelector('.popup__input_place_name');
  const link = content.querySelector('.popup__input_place_source');
  const close = content.querySelector('.popup__close');

  popup.innerHTML = "";
  openPopup();  
  close.addEventListener('click', closePopup);
  container.addEventListener('submit', ()=>{
    event.preventDefault();
    createCard(name.value, link.value);
    closePopup();
  });  
  popup.append(content);
};

const likeCard = function(element){
  element.classList.toggle('element__like_active');
};


/*==============================imageReview============================*/
function createPopupImage(name, link){
  const container = imageTemplate.cloneNode(true);
  popup.innerHTML = "";
  const content = container.querySelector('.popup__figure');
  const place = content.querySelector('.popup__figcaption');
  const source = content.querySelector('.popup__image');
  const close = content.querySelector('.popup__close');
  place.textContent = name;
  source.src = link;
  source.alt = name;
  popup.classList.add('popup_dark');
  openPopup();
  close.addEventListener('click', ()=>{
    closePopup();
    popup.classList.remove('popup_dark');
  });  
  popup.append(content);
}

/*==============================commonFunctions============================*/
function openPopup(){
  popup.classList.add('popup_opened');
}

function closePopup(){
  popup.classList.animation = "fadeOut 0.5s linear";
  popup.classList.remove('popup_opened');
}


/*==============================eventListeners============================*/
profileButton.addEventListener('click', showProfilePopup);
cardButton.addEventListener('click', showCardPopup);
