let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let submitВutton = document.querySelector('.popup__submit-button');

let formProfileEdit = document.querySelector('.popup');
let nameInput = document.getElementById('name-input');
let aboutInput = document.getElementById('about-input');


let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');


//функция показывающая/скрывающая форму редактирования профиля
function PopupProfileEdit() {
    if (formProfileEdit.classList.contains ('popup_opened')) {
        formProfileEdit.classList.remove('popup_opened');
    } else {
        formProfileEdit.classList.add('popup_opened');
        nameInput.value = profileTitle.textContent;
        aboutInput.value = profileDescription.textContent;
    }    
} 

//функция сохраняющия поля из формы редактирования профиля
function PopupProfileSubmit(evt) {
    evt.preventDefault();
    nameInput = document.getElementById('name-input');
    aboutInput = document.getElementById('about-input');

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;

    PopupProfileEdit();
}


//слушатель - редактирование профиля
editButton.addEventListener('click', PopupProfileEdit);

//слушатель - закрытия формы редактирование профиля
closeButton.addEventListener('click', PopupProfileEdit);

//слушатель - сохрание полей профиля
submitВutton.addEventListener('click', PopupProfileSubmit);

//слушатели - кнопок лайк
document.querySelectorAll('.element__like-it').forEach(item => {
    item.addEventListener('click', event => {item.classList.toggle('element__like-it_activated');})
})