// функция отображающая Popup и скрывающая Popup
function showPopup(popupConst) {
    popupConst.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupOnEscapeKey);
  };
// функция скрывающая Popup
function hidePopup(popupConst) {
    popupConst.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupOnEscapeKey);
  };
// закрытие Popup по клавише Esc
function closePopupOnEscapeKey(evt) {
    if (evt.key === "Escape") {
      hidePopup(document.querySelector(".popup_opened"));
    }
  };
  
  export {
    showPopup,
    hidePopup,
    closePopupOnEscapeKey
  }