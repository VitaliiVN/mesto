import initialCards from "./CardsPreset.js";

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

const popupPicture = document.querySelector(".popup_type_picture");
const srcPicture = popupPicture.querySelector(".popup__picture");
const pictureTitle = popupPicture.querySelector(".popup__picture-title");

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".elements__list");


// закрытие Popup по клику на оверлэй
function closeOverlayClick(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close-button") ) {
    hidePopup(evt.currentTarget);
  }
};

// закрытие Popup по клавише Esc
function closePopupOnEscapeKey(evt) {
  if (evt.key === "Escape") {
    hidePopup(document.querySelector(".popup_opened"));
  }
};


// функция отображающая Popup и скрывающая Popup
function showPopup(popupConst) {
  popupConst.classList.add("popup_opened");
  popupConst.addEventListener("mousedown", closeOverlayClick);
  document.addEventListener("keydown", closePopupOnEscapeKey);
};

// функция скрывающая Popup
function hidePopup(popupConst) {
  popupConst.classList.remove("popup_opened");
  popupConst.removeEventListener("mousedown", closeOverlayClick);
  document.removeEventListener("keydown", closePopupOnEscapeKey);
};

//Редактирование профиля
//функция показывающая/скрывающая форму редактирования профиля
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
function createCard(srcValue, titleValue) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const likeButton = cardElement.querySelector(".element__like-it");
  const trashButton = cardElement.querySelector(".element__trash-can");
  const cardImage = cardElement.querySelector(".element__image");

  //Заполняем атрибуты
  cardImage.setAttribute("src", srcValue);
  cardImage.setAttribute("alt", titleValue);
  cardElement.querySelector(".element__title").textContent = titleValue;

  //добавляем слушателя кнопки Like
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__like-it_activated");
  });
  //добавляем слушателя для кноки удаления
  trashButton.addEventListener("click", function () {
    trashButton.closest(".element").remove();
  });
  //добавляем слушатель для клика по картинке
  cardImage.addEventListener("click", function () {
    showPopup(popupPicture);
    srcPicture.setAttribute("src", cardImage.getAttribute("src"));
    srcPicture.setAttribute("alt", cardImage.getAttribute("alt"));
    pictureTitle.textContent = cardImage.getAttribute("alt");
  });
  return cardElement;
};

//Создание карточки через форму
function submitCardForm(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(cardUrlInput.value, cardNameInput.value));
  cardNameInput.value="";
  cardUrlInput.value="";
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

//инициализация стартовых карточек из массива
initialCards.forEach((item) =>
  cardsContainer.append(createCard(item.link, item.name))
);
