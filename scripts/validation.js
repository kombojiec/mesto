class FormValidator{
  constructor(object, formElement){
    this._form = formElement;
    this._input =  object.inputSelector;
    this._submitButton = formElement.querySelector(object.submitButtonSelector);
    this._inactiveButton =  object.inactiveButtonClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._inputErrorClass =  object.errorClass;
    this._errorClass =  object.errorClass;
  }

  _showError(input){
    const error = this._form.querySelector(`#${input.id}-error`);    
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass); 
    error.textContent = input.validationMessage;
  }

  _hideError(input){
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass); 
    error.textContent = "";
  }

  _checkValidity(input){
    if(!input.validity.valid){
      this._showError(input, input.validationMessage);
    }else{
      this._hideError(input);
    }
  }

  _hasInvalidInput(){
    return this._inputList.some(input => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(){
    if(this._hasInvalidInput()){      
      this._disableButton(this._submitButton);
      this._submitButton.classList.add(this._inactiveButton);
    }else{
      this._submitButton.removeAttribute('disabled', true);
      this._submitButton.classList.remove(this._inactiveButton);
    }
  }

  _setEventListeners(){    
    this._toggleButtonState();
    this._inputList.forEach(input =>{
      input.addEventListener('input', ()=>{  
        this._checkValidity(input);
        this._toggleButtonState();
      });
    });    
  }

  _disableButton(button){
    button.setAttribute('disabled', true);
  }

  enableValidation(){
    this._form.addEventListener('submit', (event) =>{
      event.preventDefault();      
    });
    this._setEventListeners();
  }
}

export default FormValidator;
