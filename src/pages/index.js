'use strict';

/*==============================modules-import============================*/
import './index.css';
import { formObject, profileButton, 
        authorInput, businessInput, 
        cardButton, cardTemplate, cardSection,
        forms, avatarContent, avatarItem} from '../utiles/constants.js';
import Card from '../components/card.js';
import FormValidator from '../components/validation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirmation from '../components/PopupConfirmation.js';




/*==============================editProfile============================*/
const profileInfo = new UserInfo({
  name: '.profile__name',
  business: '.profile__business',
  avatar: '.profile__avatar',
});

profileInfo.setUserInfo();

const showProfilePopup = new PopupWithForm({
  formElement: forms[0],
  popupSelector: '.popup_form_profile',
},(data) => {
  new Api().setUser(data);
  profileInfo.setUserInfo();
});

profileButton.addEventListener('click', ()=>{
  authorInput.value = profileInfo.getUserInfo().name;
  businessInput.value = profileInfo.getUserInfo().business;
  showProfilePopup.open();
});

showProfilePopup.setEventListeners();


/*==============================addCards============================*/
const renderCard = new Section({
  items: [],
  renderer: (item) => {
    const card = new Card(
      item.name,
      item.link, 
      item.likes,
      item.owner._id, 
      item._id,
      cardTemplate,  
      handleCardClick);
    renderCard.addItem(card.createCardElement());
  }
}, '.elements');


new Api().getCards()
.then(array => {
  array.forEach(item =>{    
    const card = new Card(
      item.name,
      item.link, 
      item.likes, 
      item.owner._id,
      item._id,
      cardTemplate,  
      handleCardClick);
    renderCard.addItem(card.createCardElement());
    
  });
});

const newPopup = new PopupWithForm({formElement: forms[1],
  popupSelector: '.popup_form_card'}, 
  (inputData)=>{
    new Api().addCard(inputData['card-name'], inputData['card-sourse'])
    .then(response => {
      const card = new Card(
        response.name, 
        response.link, 
        response.likes,
        response.owner._id,
        response._id,
        cardTemplate,
        handleCardClick);
      renderCard.addItem(card.createCardElement(), true); 
    });
});


const imagePopup = new PopupWithImage({
  popupSelector: '.popup_image',
  imageSelector: '.popup__image',
  imageFigcaption: '.popup__figcaption'
});
imagePopup.setEventListeners();

const handleCardClick = (name, link)=>{
  imagePopup.open(name, link);
};


newPopup.setEventListeners();
cardButton.addEventListener('click', ()=>{
  newPopup.open();
  formCardValidator.disableButton(forms[1].querySelector('.popup__button'));
});


/*==============================removePopup============================*/
const removePopup = new PopupConfirmation('.popup_remove');
removePopup.setEventListeners();


/*==============================avatarPopup============================*/
const avatarPopup = new PopupWithForm({
  formElement: forms[3],
  popupSelector: '.popup_avatar',
}, (inputData) =>{
  new Api().changeAvatar(inputData['avatar-sourse'])
  .then(response =>{
    avatarContent.src =  response.avatar;
  });
});
avatarPopup.setEventListeners();

avatarItem.addEventListener('click',()=>{
  avatarPopup.open();
});

// console.log(avatar);

/*==============================validationForms============================*/
  const formProfileValidator = new FormValidator(formObject, forms[0]);
  formProfileValidator.enableValidation();

  const formCardValidator = new FormValidator(formObject, forms[1]);
  formCardValidator.enableValidation();

  const formAvatarValidator = new FormValidator(formObject, forms[3]);
  formAvatarValidator.enableValidation();


/*==============================modules-export============================*/
export {removePopup};

// new Api().changeAvatar('https://i.ytimg.com/vi/91wyQQjl8IQ/maxresdefault.jpg')
// .then(response => console.log(response));
