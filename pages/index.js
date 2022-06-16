import initialCards from "./CardsPreset.js";
import Card from "./Сard.js";
import FormValidator from "./FormValidator.js";
import { popupPicture } from "../utils/constants.js";
import { showPopup, hidePopup} from "../utils/utils.js";

// инициализация параметров валидации 
const initialParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_activated'
}; 

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

const profileEditFormCloseButton = document.querySelector("#close-button-edit-card-form");
const cardAddFormCloseButton = document.querySelector("#close-button-add-card-form");
const pictureCloseButton = document.querySelector("#close-button-picture");

const profileEditForm = document.querySelector(".popup__form");
const cardAddForm = document.querySelector('[name="popup-card-form"]');

const popupProfile = document.querySelector(".popup_type_edit");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const aboutInput = profileEditForm.querySelector(".popup__input_type_about");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupCard = document.querySelector(".popup_type_add-card");
const cardNameInput = cardAddForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = cardAddForm.querySelector(".popup__input_type_card-link");

const cardSelector = "#card-template";
const cardsContainer = document.querySelector(".elements__list");

// инициализация валидации для всех форм
const forms = Array.from(document.querySelectorAll(initialParams.formSelector));  
forms.forEach((formElement) => {
  const newFormValidation = new FormValidator(initialParams, formElement);
  newFormValidation.enableValidation();
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // очистка результатов валидации и блокирование кнопки при сабмите
    newFormValidation.resetFormValidation();
  });
});

// закрытие Popup по клику на оверлэй
function closeOverlayClick(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close-button") ) {
    hidePopup(evt.currentTarget);
  }
};

//Редактирование профиля
function activateProfileEditPopup() {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
  showPopup(popupProfile);
};

//функция сохраняющия поля из формы редактирования профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  hidePopup(popupProfile);
};

//Генерация карточки
function createCard(paramList) {
  const cardItem = new Card(paramList, cardSelector);
  return cardItem.generateCard();
};

//Создание карточки через форму
function submitCardForm(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({
    srcValue: cardUrlInput.value, 
    titleValue: cardNameInput.value
  }));
  cardAddForm.reset();
  hidePopup(popupCard);
};

//слушатель - редактирование профиля
profileEditButton.addEventListener("click", activateProfileEditPopup);

//слушатель - закрытия формы редактирование профиля
profileEditFormCloseButton.addEventListener("click", function () {
  hidePopup(popupProfile);
});

//слушатель - сохрание полей профиля
profileEditForm.addEventListener("submit", submitProfileForm);

//слушатель - кнопки добавления карточки
cardAddButton.addEventListener("click", function () {
  showPopup(popupCard);
});

//слушатель - закрытия формы добавления карточки
cardAddFormCloseButton.addEventListener("click", function () {
  hidePopup(popupCard);
});

//слушатель - сохрание карточки
cardAddForm.addEventListener("submit", submitCardForm);

//слушатель - закрытия попапа с картинкой
pictureCloseButton.addEventListener("click", function () {
  hidePopup(popupPicture);
});

//слушатели - клик по оверлэю для закрытия попапа
popupPicture.addEventListener("mousedown", closeOverlayClick);
popupCard.addEventListener("mousedown", closeOverlayClick)
popupProfile.addEventListener("mousedown", closeOverlayClick);

//инициализация стартовых карточек из массива
initialCards.forEach((item) =>
  cardsContainer.append(createCard({
    srcValue: item.link,
    titleValue: item.name
    }))
);