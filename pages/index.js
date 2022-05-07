import initialCards from "./CardsPreset.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const profileEditFormCloseButton = document.querySelector('#close-button-edit-card-form');
const cardAddFormCloseButton = document.querySelector('#close-button-add-card-form');
const pictureCloseButton = document.querySelector('#close-button-picture');

const profileEditForm = document.querySelector('.popup__form');
const cardAddForm = document.querySelector('[name="popup-card-form"]');

const popupProfile = document.querySelector('.popup_type_edit');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const aboutInput = profileEditForm.querySelector('.popup__input_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupCard = document.querySelector('.popup_type_add-card');
const cardNameInput = cardAddForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardAddForm.querySelector('.popup__input_type_card-link');

const popupPicture = document.querySelector('.popup_type_picture');
const srcPicture = popupPicture.querySelector('.popup__picture');
const pictureTitle = popupPicture.querySelector('.popup__picture-title');

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.elements__list');




//универсальная функция отображающая и скрывающая Popup
function showHidePopup(popupConst) {
  popupConst.classList.toggle('popup_opened');
} 

//Редактирование профиля
//функция показывающая/скрывающая форму редактирования профиля
function activateProfileEditPopup() {
    if (!popupProfile.classList.contains ('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        aboutInput.value = profileDescription.textContent;
      }; 
    showHidePopup(popupProfile);
} 

//функция сохраняющия поля из формы редактирования профиля
function submitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
    activateProfileEditPopup();
}


//Генерация карточки
function createCard(srcValue, titleValue) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const likeButton = cardElement.querySelector('.element__like-it');
  const trashButton = cardElement.querySelector('.element__trash-can');
  const cardImage = cardElement.querySelector('.element__image');

  //Заполняем атрибуты
  cardImage.setAttribute("src", srcValue);
  cardImage.setAttribute("alt", titleValue);
  cardElement.querySelector('.element__title').textContent = titleValue;

  //добавляем слушателя кнопки Like
  likeButton.addEventListener('click', function () { likeButton.classList.toggle('element__like-it_activated');});
  //добавляем слушателя для кноки удаления
  trashButton.addEventListener('click', function () { trashButton.closest('.element').remove();});
  //добавляем слушатель для клика по картинке
  cardImage.addEventListener('click', function () { showHidePopup(popupPicture);
                                                        srcPicture.setAttribute('src', pictureButton.getAttribute('src') );
                                                        srcPicture.setAttribute('alt', pictureButton.getAttribute('alt'));
                                                        pictureTitle.textContent = pictureButton.getAttribute('alt');
                                                                                });
  return cardElement;                                                                               
} 


//Создание карточки черех форму
function submitCardForm(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(cardUrlInput.value, cardNameInput.value));
  showHidePopup(popupCard); 
}


//слушатель - редактирование профиля
profileEditButton.addEventListener('click', activateProfileEditPopup);

//слушатель - закрытия формы редактирование профиля
profileEditFormCloseButton.addEventListener('click', activateProfileEditPopup);

//слушатель - сохрание полей профиля
profileEditForm.addEventListener('submit', submitProfileForm);

//слушатель - кнопки добавления карточки
cardAddButton.addEventListener('click', function () { showHidePopup(popupCard);});

//слушатель - закрытия формы добавления карточки
cardAddFormCloseButton.addEventListener('click',  function () { showHidePopup(popupCard);});

//слушатель - сохрание карточки
cardAddForm.addEventListener('submit', submitCardForm);

//слушатель - закрытия попапа с картинкой
pictureCloseButton.addEventListener('click', function () {showHidePopup(popupPicture);});

//инициализация стартовых карточек из массива
initialCards.forEach((item) => cardsContainer.append(createCard(item.link, item.name)));