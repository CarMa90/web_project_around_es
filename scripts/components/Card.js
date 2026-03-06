export default class Card {
  constructor(data, template, { handleCardClick }) {
    this.name = data.name || "Sin título";
    this.link = data.link || "./images/placeholder.jpg";
    this.template = template;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this.template.cloneNode(true);

    return cardElement;
  }

  _handleCardLikes(card) {
    card.classList.toggle("card__like-button_is-active");
  }

  _handleCardRemove(card) {
    if (confirm(`¿Seguro que quieres eliminar ${this.name}?`)) {
      card.remove();
    }
  }

  /*
  _handleOpenImageModal() {
    // this.handleCardClick(el);
    const imageModal = document.querySelector("#image-popup");
    imageModal.classList.add("popup_is-opened");
    imageModal.querySelector(".popup__image").src = this.link;
    imageModal.querySelector(".popup__image").alt = this.name;
    imageModal.querySelector(".popup__caption").textContent = this.name;
  }
  */

  _showPopupWithImage() {
    this.handleCardClick();
  }

  _generateCard() {
    this.element = this._getTemplate();

    const cardTitle = this.element.querySelector(".card__title");
    const cardImage = this.element.querySelector(".card__image");
    const cardLikeBtn = this.element.querySelector(".card__like-button");
    const cardRemoveBtn = this.element.querySelector(".card__delete-button");

    cardLikeBtn.addEventListener("click", (e) => {
      this._handleCardLikes(cardLikeBtn);
    });

    cardRemoveBtn.addEventListener("click", (e) => {
      this._handleCardRemove(this.element);
    });

    cardImage.addEventListener("click", (e) => {
      // this._handleOpenImageModal();
      this._showPopupWithImage();
    });

    cardTitle.textContent = this.name;
    cardImage.src = this.link;
    cardImage.alt = this.name;

    return this.element;
  }

  renderCard() {
    const card = this._generateCard();

    document.querySelector(".cards__list").prepend(card);
  }
}
