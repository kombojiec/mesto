'use strict';

/*==============================modules-import============================*/
import './index.css';
import { formObject, profileButton, 
        authorInput, businessInput, 
        cardButton, cardTemplate, cardSection,
        forms} from '../utiles/constants.js';
import Card from '../components/card.js';
import FormValidator from '../components/validation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Popup from '../components/Popup.js';




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
  // profileInfo.setUserInfo();
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

new Api().getCards()
.then(array => {
  array.forEach(item =>{    
    const card = new Card(
      item.name,
      item.link, 
      item.likes.length, 
      item.owner._id,
      item._id,
      cardTemplate,  
      handleCardClick,
      confirmRemoveCard);      
    renderCard.addItem(card.createCardElement());
    
  });
  // renderCard.renderItems();
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

const confirmRemoveCard = (id,element) => {
  removePopup.open();
  document.querySelector('.popup__button_remove').addEventListener('click', (event)=>{
    event.preventDefault();
    new Api().removeCard(id)
    .then(card => {
      console.log(card);
      element.remove();
      removePopup.close();
    });
  });
};


const renderCard = new Section({
  items: [],
  renderer: (item) => {
    const card = new Card(
      item.name,
      item.link, 
      item.likes.length,
      item.owner._id, 
      item._id,
      cardTemplate,  
      handleCardClick,
      confirmRemoveCard);      
    renderCard.addItem(card.createCardElement());
  }
}, '.elements');


const newPopup = new PopupWithForm({formElement: forms[1],
  popupSelector: '.popup_form_card'}, 
  (inputData)=>{
    new Api().addCard(inputData['card-name'], inputData['card-sourse'])
    .then(response => {
      const card = new Card(
        response.name, 
        response.link, 
        response.likes.length,
        response.owner._id,
        response._id,
        cardTemplate,
        handleCardClick,
        confirmRemoveCard); 
      renderCard.addItem(card.createCardElement(), true); 
    });
});

newPopup.setEventListeners();
cardButton.addEventListener('click', ()=>{
  newPopup.open();
  formCardValidator.disableButton(forms[1].querySelector('.popup__button'));
});


/*==============================removePopup============================*/
const removePopup = new Popup('.popup_remove');
removePopup.setEventListeners();


/*==============================validationForms============================*/
  const formProfileValidator = new FormValidator(formObject, forms[0]);
  formProfileValidator.enableValidation();
  const formCardValidator = new FormValidator(formObject, forms[1]);
  formCardValidator.enableValidation();


/*==============================modules-export============================*/
export {removePopup};

