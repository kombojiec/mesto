'use strict';

/*==============================modules-import============================*/
import './index.css';
import { formObject, profileButton, 
        authorInput, businessInput, 
        cardButton, cardTemplate, /*cardSection,*/
        forms, avatarContent, avatarItem, 
        createCard, changeButtonValue} from '../utiles/constants.js';
import FormValidator from '../components/validation.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
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
  popupSelector: '.popup_form_profile',},
  (data) => {
  new Api().setUser(data)
    .then(res =>{
      profileInfo.setUserInfo();
      changeButtonValue(forms[0], 'Сохранить');
    })
    .catch(()=> errorPopup.open())
    .finally(()=> showProfilePopup.close());
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
    const card = createCard(item);
    renderCard.addItem(card.createCardElement());
  }
}, '.elements');

new Api().getCards()
.then(array => {
  array.forEach(item =>{    
    const card = createCard(item);
    renderCard.addItem(card.createCardElement());    
  });
});

const newPopup = new PopupWithForm({formElement: forms[1],
  popupSelector: '.popup_form_card'}, 
  (inputData)=>{
    new Api().addCard(inputData['card-name'], inputData['card-sourse'])
    .then(item => {
      const card = createCard(item);
      renderCard.addItem(card.createCardElement(), true); 
    })
    .then(() => changeButtonValue(forms[1], 'Создать'))
    .catch(()=> errorPopup.open())
    .finally(()=> newPopup.close());
});


const imagePopup = new PopupWithImage({
  popupSelector: '.popup_image',
  imageSelector: '.popup__image',
  imageFigcaption: '.popup__figcaption'
});
imagePopup.setEventListeners();

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
  popupSelector: '.popup_avatar',}, 
  (inputData) =>{
  new Api().changeAvatar(inputData['avatar-sourse'])
  .then(response =>{
    avatarContent.src =  response.avatar;
  })
  .then(res => changeButtonValue(forms[3], 'Сохранить'))
  .catch(()=> errorPopup.open())
  .finally(()=> avatarPopup.close());
});
avatarPopup.setEventListeners();

avatarItem.addEventListener('click',()=>{
  avatarPopup.open();
});


/*==============================errorPopup============================*/
const errorPopup = new Popup('.popup_error');
errorPopup.setEventListeners();


/*==============================validationForms============================*/
  const formProfileValidator = new FormValidator(formObject, forms[0]);
  formProfileValidator.enableValidation();

  const formCardValidator = new FormValidator(formObject, forms[1]);
  formCardValidator.enableValidation();

  const formAvatarValidator = new FormValidator(formObject, forms[3]);
  formAvatarValidator.enableValidation();


/*==============================modules-export============================*/
export {removePopup, changeButtonValue, imagePopup, errorPopup};
