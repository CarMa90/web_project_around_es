import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this.form = this._popup.querySelector("form");
    this.submitForm = submitForm;
  }

  open(cardId) {
    super.open();
    this._setInputValues(cardId);
  }

  _setInputValues(cardId) {
    this.form["card-id"].value = cardId;
  }

  _getInputValues() {
    const inputs = this.form.querySelectorAll(".popup__input");

    const inputValues = {};

    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitForm(e);
    });
  }
}
