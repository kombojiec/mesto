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
// let  popupButton = popupContainer.querySelector('.popup__button');
const elements = document.querySelector('.elements');
const popupTemplate = document.querySelector('.template').content;
const cardTemplate = document.querySelector('.elements__template').content;
const addCardButton = document.querySelector('.profile__add-button');

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



/*==============Profile window=============*/ 
// function editProfileOpen(){
//   popupOpen();
//   profileInputName.value = profileName.textContent;
//   profileInputBusiness.value = profileBusiness.textContent;
// }

// function popupOpen(){
//   popup.classList.add('popup_opened');
// }

// function popupClose(){
//   popup.classList.remove('popup_opened');
// }

// function formSubmitHandler(){
//   event.preventDefault();   
//   profileName.textContent = profileInputName.value; 
//   profileBusiness.textContent = profileInputBusiness.value;
//   popupClose();     
// }
// popup.addEventListener('submit', formSubmitHandler);

// editProfile.addEventListener('click', editProfileOpen);
// closeProfile.addEventListener('click', popupClose);

// popup.addEventListener('click', (event)=>{  
//   if(event.target == event.currentTarget){
//     popupClose();
//   }
// });



/*==============================editProfile============================*/
function showProfilePopup(){
  const content = popupTemplate.cloneNode(true);
  const container = content.querySelector('.popup__container');
  
  popup.innerHTML = "";
  container.innerHTML =`<h2 class="popup__title">Редактировать профиль</h2>
  <input type="text" class="popup__input popup__input_place_name" name="edit-name">
  <input type="text" class="popup__input popup__input_place_business" name="edit-business">
  <button class="popup__button" type="submit">Сохранить</button>
  <button class="popup__close" type="button"></button>`;
  // console.log(container);
  let name = container.querySelector('.popup__input_place_name');
  name.value = profileName.textContent;
  let business = container.querySelector('.popup__input_place_business');
  business.value = profileBusiness.textContent;
  openPopup();
  container.addEventListener('submit', ()=>{
    formSubmitHandler(name, business);
  });
  const close = container.querySelector('.popup__close');
  close.addEventListener('click', closePopup);
  popup.append(container);
}

function formSubmitHandler(name, business){
  event.preventDefault();
  profileName.textContent = name.value;
  profileBusiness.textContent = business.value;
  closePopup();
}



/*==============================addCards============================*/
function renderCards(){
  initialCards.forEach(item =>{
    createCard(item.name, item.link);
  });  
}
renderCards();

function createCard(name, link){
  let container = cardTemplate.cloneNode(true);
  container.querySelector('.element__title').textContent = name;
  container.querySelector('.element__image').alt = name;
  container.querySelector('.element__image').src = link;
  elements.append(container);
}

function showCardPopup(){
  const content = popupTemplate.cloneNode(true);
  popup.innerHTML = "";
  const container = content.querySelector('.popup__container');
  container.innerHTML = `<h2 class="popup__title">Новое место</h2>
  <input type="text" class="popup__input popup__input_place_name" name="edit-name" placeholder="Название">
  <input type="text" class="popup__input popup__input_place_link" name="edit-business" placeholder="Ссылка на картинку">
  <button class="popup__button" type="submit">Сохранить</button>
  <button class="popup__close" type="button"></button>`;  
  openPopup();  
  const close = content.querySelector('.popup__close');
  const name = content.querySelector('.popup__input_place_name');
  const link = content.querySelector('.popup__input_place_link');
  close.addEventListener('click', closePopup);
  container.addEventListener('submit', ()=>{
    addCard(name.value, link.value);
  });  
  popup.append(container);
}

function addCard(name, link){
  event.preventDefault();
  let container = cardTemplate.cloneNode(true);
  container.querySelector('.element__title').textContent = name;
  container.querySelector('.element__image').alt = name;
  container.querySelector('.element__image').src = link;
  elements.prepend(container);
  closePopup();
}




/*==============================commonFunctions============================*/
function openPopup(){
  popup.classList.add('popup_opened');
}

function closePopup(){
  popup.classList.remove('popup_opened');
}





editProfile.addEventListener('click', showProfilePopup);
addCardButton.addEventListener('click', showCardPopup);
