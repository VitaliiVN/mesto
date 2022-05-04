let editButton = document.querySelector('.profile__edit-button');
let addCardButton = document.querySelector('.profile__add-button');
let closeButton = document.querySelector('#close-button-edit-card-form');
let closeCardButton = document.querySelector('#close-button-add-card-form');
let closePictureButton = document.querySelector('#close-button-picture');
let formProfileEdit = document.querySelector('.popup__form');
let formCardAdd = document.querySelector('[name="popup-card-form"]');

let popupProfile = document.querySelector('.popup_type_edit');
let nameInput = formProfileEdit.querySelector('.popup__input_type_name');
let aboutInput = formProfileEdit.querySelector('.popup__input_type_about');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');

let popupCard = document.querySelector('.popup_type_add-card');
let cardNameInput = formCardAdd.querySelector('.popup__input_type_card-name');
let cardUrlInput = formCardAdd.querySelector('.popup__input_type_card-link');

let popupPicture = document.querySelector('.popup_type_picture');
let srcPicture = popupPicture.querySelector('.popup__picture');
let pictureTitle = popupPicture.querySelector('.popup__picture-title');

const cardTemplate = document.querySelector('#card-template').content;

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

//функция показывающая/скрывающая форму редактирования профиля
function popupFormActivate() {
    if (popupProfile.classList.contains ('popup_opened')) {
        popupProfile.classList.remove('popup_opened');
    } else {
        popupProfile.classList.add('popup_opened');
        nameInput.value = profileTitle.textContent;
        aboutInput.value = profileDescription.textContent;
    }    
} 

//функция показывающая/скрывающая форму добавлени карточки
function popupCardFormActivate() {
        popupCard.classList.toggle('popup_opened');
} 

//функция сохраняющия поля из формы редактирования профиля
function popupProfileSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
    popupFormActivate();
}

//функция для добавления карточек, если переданы параметры карточки, использубтся они, если не переданы, используются поля формы.
function popupCardSubmit(evt = 'zero', srcValue = '', titleValue = '' ) {
  
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardsContainer = document.querySelector('.elements__list');
  const likeButton = cardElement.querySelector('.element__like-it');
  const trashButton = cardElement.querySelector('.element__trash-can');
  const pictureButton = cardElement.querySelector('.element__image');

  //Если атрибуты для изображения переданы в функцию, используем их, если нет - то берём из полей формы
  if (!srcValue && !titleValue) {
      srcValue = cardUrlInput.value;
      titleValue = cardNameInput.value;
  }  
  //Заполняем атрибуты
  cardElement.querySelector('.element__image').setAttribute("src", srcValue);
  cardElement.querySelector('.element__image').setAttribute("alt", titleValue);
  cardElement.querySelector('.element__title').textContent = titleValue;
  
  if (evt !== 'zero') 
      { evt.preventDefault(); 
        cardsContainer.prepend(cardElement);
        popupCardFormActivate(); 
      }
  else { 
        cardsContainer.append(cardElement);
       }

  //добавляем слушателей к каждой создаваемой карточке:     
  //добавляем слушателя кнопки Like
  likeButton.addEventListener('click', function () { likeButton.classList.toggle('element__like-it_activated');});
  //добавляем слушателя для кноки удаления
  trashButton.addEventListener('click', function () { trashButton.closest('.element').remove();});
  //добавляем слушатель для клика по картинке
  pictureButton.addEventListener('click', function () { popupPicture.classList.toggle('popup_opened');
                                                        srcPicture.setAttribute('src', pictureButton.getAttribute('src') );
                                                        srcPicture.setAttribute('alt', pictureButton.getAttribute('alt'));
                                                        pictureTitle.textContent = pictureButton.getAttribute('alt');
                                                                                });
  
}


//слушатель - редактирование профиля
editButton.addEventListener('click', popupFormActivate);

//слушатель - закрытия формы редактирование профиля
closeButton.addEventListener('click', popupFormActivate);

//слушатель - сохрание полей профиля
formProfileEdit.addEventListener('submit', popupProfileSubmit);

//слушатель - добавления карточки
addCardButton.addEventListener('click', popupCardFormActivate);

//слушатель - закрытия формы добавления карточки
closeCardButton.addEventListener('click', popupCardFormActivate);

//слушатель - сохрание полей профиля
formCardAdd.addEventListener('submit', popupCardSubmit);

//слушатель - закрытия попапа с картинкой
closePictureButton.addEventListener('click', function () { popupPicture.classList.toggle('popup_opened');});

//инициализация стартовых карточек из массива
initialCards.forEach((item) => popupCardSubmit('zero', item.link, item.name));
