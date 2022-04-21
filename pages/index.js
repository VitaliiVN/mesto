let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formProfileEdit = document.querySelector('.popup__form');

let popupProfile = document.querySelector('.popup_type_edit');
let nameInput = formProfileEdit.querySelector('.popup__input_type_name');
let aboutInput = formProfileEdit.querySelector('.popup__input_type_about');


let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');


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

//функция сохраняющия поля из формы редактирования профиля
function popupProfileSubmit(evt) {
    evt.preventDefault();
/*  nameInput = document.getElementById('name-input');
    aboutInput = document.getElementById('about-input');*/

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;

    popupFormActivate();
}


//слушатель - редактирование профиля
editButton.addEventListener('click', popupFormActivate);

//слушатель - закрытия формы редактирование профиля
closeButton.addEventListener('click', popupFormActivate);

//слушатель - сохрание полей профиля
formProfileEdit.addEventListener('submit', popupProfileSubmit);

//слушатели - кнопок лайк
document.querySelectorAll('.element__like-it').forEach(item => {
    item.addEventListener('click', event => {item.classList.toggle('element__like-it_activated');})
})