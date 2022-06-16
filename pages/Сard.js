import {
  popupPicture,
  srcPicture,
  pictureTitle
} from "../utils/constants.js";

import { showPopup } from "../utils/utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
  }
  //метод получения шаблона для карточки
  _getCardTemplate() {
    const cardElement  = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    
    return cardElement ;
  }
  //публичный метод генерации карточки
  generateCard() {
    this._cardElement = this._getCardTemplate();
    this._cardImage = this._cardElement.querySelector(".element__image");

    this._likeButton = this._cardElement.querySelector(".element__like-it");
    this._setEventListeners();
    this._cardImage.src = this._data.srcValue;
    this._cardImage.alt = this._data.titleValue;
    this._cardElement.querySelector(".element__title").textContent = this._data.titleValue;
    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
    this._handleLikeBtnClick()
    });
    this._cardElement.querySelector(".element__trash-can").addEventListener("click", () => {
    this._handleTrashBtnClick()
    });
    this._cardImage.addEventListener("click", () => {
    this._handleImageClick()
    });
  }
  //обработчик кнопки лайк
  _handleLikeBtnClick() {
    this._likeButton.classList.toggle("element__like-it_activated");
  }
    
  //обработчик кнопки удаления
  _handleTrashBtnClick() {
    this._cardElement.closest(".element").remove();
  }

  //обработчик клика по изображению на карточке  
  _handleImageClick() {
    srcPicture.src = this._cardImage.src;
    srcPicture.alt = this._cardImage.alt;
    pictureTitle.textContent = this._cardImage.alt;
    showPopup(popupPicture);
  }
}