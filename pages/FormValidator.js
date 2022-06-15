export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

// Отображение ошибок валидации
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    /*inputElement.classList.add(this._config.inputErrorClassActive);*/
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

// Скрытие ошибок валидации
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._config.errorClass);
    /*inputElement.classList.remove(this._config.inputErrorClassActive);*/
    errorElement.textContent = "";
  }

// Проверка валидности поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

// Проверка на валиднось нескольких полей 
  _hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

// Активация/деактивация кнопки отправки по итогам валидации
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputs)) {
      this.disableSbtButton();
    } else {
      this.enableSbtButton();
    }
  }

// Установка слушателей на поля формы
  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

// Деактивация кнопки формы
  disableSbtButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

// Активация кнопки формы
  enableSbtButton() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

// Сброс ошибок валидации и блокировка submit кнопки в форме
  resetFormValidation() {
    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this.disableSbtButton();
  }

// Включение валидации
  enableValidation() {
    this._setEventListeners();
  }

}
