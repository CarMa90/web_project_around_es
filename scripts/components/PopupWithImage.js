import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ link, name }) {
    this._link = link;
    this._name = name;
    super.open();
    // alert("Estás usando la clase PopupWithImage");
    this._popup.querySelector(".popup__image").src = this._link;
    this._popup.querySelector(".popup__image").alt = this._name;
    this._popup.querySelector(".popup__caption").textContent = this._name;
  }
}
