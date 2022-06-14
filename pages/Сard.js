import { showPopup, popupPicture } from "./index.js";

export default class Card {
    constructor(data, cardSelector) {
        this._data = data;
        this._cardSelector = cardSelector;
    }

    _getCardTemplate() {
      const cardElement  = document
        .querySelector(this._cardSelector)
        .content.querySelector(".element")
        .cloneNode(true);
      return cardElement ;
    }

    generateCard() {
      this._cardElement = this._getCardTemplate();
      this._cardImage = this._card.querySelector(".element__image");

      this._setEventListeners();
      this._cardImage.src = this._data.link;
      this._cardImage.alt = this._data.name;
      this._cardElement.querySelector(".element__title").textContent = this._data.name;
      return this._cardElement;
    }

    _setEventListeners() {
      this._likeButton.querySelector(".element__like-it").addEventListener("click", () => {
        this._handleLikeBtnClick()
    });
      this._trashButton.querySelector(".element__trash-can").addEventListener("click", () => {
        this._handleTrashBtnClick()
    });
      this._cardImage.addEventListener("click", () => {
        this._handleImageClick()
    });
    }

    _handleLikeBtnClick() {
      this._likeButton.querySelector(".element__like-it").classList.toggle("element__like-it_activated");
    }
    
    _handleTrashBtnClick() {
      this._trashButton.closest(".element").remove();
    }
    
    _handleImageClick() {
      const srcPicture = document.querySelector(".popup__picture");
      const pictureTitle = document.querySelector(".popup__picture-title");

      srcPicture.src = this._cardImage.src;
      srcPicture.alt = this._cardImage.alt;
      pictureTitle.textContent = this._cardImage.alt;
      showPopup(popupPicture);
    }
}