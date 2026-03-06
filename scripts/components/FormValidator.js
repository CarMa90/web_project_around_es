export class FormValidator {
  constructor(form, inputs) {
    this.form = form;
    this.inputs = inputs;
  }

  _toggleDisableButton(form) {
    const submitBtn = this.form.querySelector(".popup__button");
    // console.log(form.checkValidity());
    if (!form.checkValidity()) {
      submitBtn.disabled = true;
    } else {
      submitBtn.disabled = false;
    }
  }

  _showErrorMessage(input, errorMessage) {
    const $errorMessageSpan = document.querySelector(
      `.${input.name}-error-message`,
    );
    $errorMessageSpan.textContent = errorMessage;
  }

  _hideErrorMessage(input) {
    const $errorMessageSpan = document.querySelector(
      `.${input.name}-error-message`,
    );
    $errorMessageSpan.textContent = "";
  }

  _checkInputValidity(input) {
    // console.log(input.validationMessage);
    if (!input.validity.valid) {
      this._showErrorMessage(input, input.validationMessage);
    } else {
      this._hideErrorMessage(input);
    }
  }

  setEventListeners() {
    this.form.addEventListener("input", (e) => {
      this._toggleDisableButton(this.form);
    });

    this.form.addEventListener("submit", (e) => {
      this._toggleDisableButton(this.form);
    });

    document.addEventListener("click", (e) => {
      if (
        e.target.matches(".profile__edit-button") ||
        e.target.matches(".profile__add-button")
      ) {
        this._toggleDisableButton(this.form);
      }
    });

    this.inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        this._checkInputValidity(input);
      });

      document.addEventListener("click", (e) => {
        if (
          e.target.matches(".profile__edit-button") ||
          e.target.matches(".profile__add-button")
        ) {
          this._checkInputValidity(input);
        }
      });
    });
  }
}
