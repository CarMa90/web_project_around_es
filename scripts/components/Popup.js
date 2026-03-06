export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    // alert("Estás usando la clase Popup");
    this._popup.classList.add("popup_is-opened");
  }

  close() {
    if (this._popup.classList.contains("popup_is-opened")) {
      // alert("Estás usando la clase Popup");
      this._popup.classList.remove("popup_is-opened");
    }
  }

  _handleEscClose() {
    if (this._popup.classList.contains("popup_is-opened")) {
      // console.log("Estás usando la clase Popup");
      this._popup.classList.remove("popup_is-opened");
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (e) => {
      if (
        !(
          e.target.matches(".popup__content *") ||
          e.target.matches(".popup__content")
        ) ||
        e.target.matches(".popup__close")
      ) {
        this.close();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this._handleEscClose();
      }
    });
  }
}
