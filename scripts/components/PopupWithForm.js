import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this.form = this._popup.querySelector("form");
    this.submitForm = submitForm;
  }

  _getInputValues() {
    const inputs = this.form.querySelectorAll(".popup__input");

    const inputValues = {};

    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  _handleEscClose() {
    if (this._popup.classList.contains("popup_is-opened")) {
      // console.log("estás utilizando la clase PopupWithForm");
      this.form.reset();
    }
    super._handleEscClose();
  }

  close() {
    // console.log("estás utilizando la clase PopupWithForm");
    this.form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", (e) => {
      this.submitForm(e);
    });
  }
}
