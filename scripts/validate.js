'use strict';

function showInputError(form, input, message, object){
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(object.inputErrorClass);
  error.classList.add(object.errorClass);
  error.textContent = message;
}

function hideError(form, input, object){
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(object.inputErrorClass);
  error.classList.remove(object.errorClass);
  error.textContent = "";
}

function checkInputValidity(form, input, object){
  if(!input.validity.valid){
    showInputError(form, input, input.validationMessage, object);
  }else{
    hideError(form, input, object);
  }
}

function hasInvalidInput(inputList){
  return inputList.some(input => {
    return !input.validity.valid;    
  });
}

function toggleButtonState(inputList, formButton, object){    
  if(hasInvalidInput(inputList)){
    formButton.setAttribute('disabled', true);
    formButton.classList.add(object.inactiveButtonClass);
  }else{
    formButton.removeAttribute('disabled', true);
    formButton.classList.remove(object.inactiveButtonClass);
  }
}

function setEventListeners(form, object){
  const inputList = Array.from(form.querySelectorAll(object.inputSelector));
  const formButton = form.querySelector(object.submitButtonSelector);  
  toggleButtonState(inputList, formButton, object);
  inputList.forEach(input => {
    input.addEventListener('input', ()=>{
      checkInputValidity(form, input, object);
      toggleButtonState(inputList, formButton, object);
    });
  });
}

function enableValidation(object){
  const formList = Array.from(document.querySelectorAll(object.formSelector));  
  formList.forEach(form =>{
    form.addEventListener('submit', event =>{
      event.preventDefault();      
    });
    setEventListeners(form, object);    
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});



