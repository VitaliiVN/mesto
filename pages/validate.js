// Отображение ошибок валидации
function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };
  
  
  // Скрытие ошибок валидации
  function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  };
  
  
  // Проверка валидности поля
  function isValid(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  // установка слушателей на поля формы
  function setEventListeners(formElement, config) {
    const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    toggleButtonState(inputs, buttonElement, config);
  
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        isValid(formElement, inputElement, config );
        toggleButtonState(inputs, buttonElement, config);
      });
    });
  };
  
  // проверка на валиднось нескольких полей 
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }) 
  };
  
  // активация/деактивация кнопки отправки по итогам валидации
  function toggleButtonState (inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  }; 
  
  // Включение валидации для всех форм
  function enableValidation (config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
  
    forms.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, config);
    });
  };
  
  // инициализация параметров валидации 
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_activated'
  }); 