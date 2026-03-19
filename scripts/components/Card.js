export default class Card {
  constructor(
    data,
    template,
    { handleCardClick },
    { handleDeleteClick },
    { handleLikeClick },
  ) {
    this.name = data.name || "Sin título";
    this.link = data.link || "./images/placeholder.jpg";
    this._id = data._id;
    this._isLiked = data.isLiked;
    this.template = template;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = this.template.cloneNode(true);

    return cardElement;
  }

  _handleCardLikes(cardLikeBtn, cardId) {
    this.handleLikeClick(cardLikeBtn, cardId);
  }

  _handleCardRemove(cardId) {
    this.handleDeleteClick(cardId);
  }

  _showPopupWithImage() {
    this.handleCardClick();
  }

  _generateCard() {
    this.element = this._getTemplate();

    const cardTitle = this.element.querySelector(".card__title");
    const cardImage = this.element.querySelector(".card__image");
    const cardLikeBtn = this.element.querySelector(".card__like-button");
    const cardRemoveBtn = this.element.querySelector(".card__delete-button");

    if (this._isLiked) {
      cardLikeBtn.classList.add("card__like-button_is-active");
    } else if (!this._isLiked) {
      cardLikeBtn.classList.remove("card__like-button_is-active");
    }

    cardLikeBtn.addEventListener("click", (e) => {
      this._handleCardLikes(cardLikeBtn, this._id);
    });

    cardRemoveBtn.addEventListener("click", (e) => {
      this._handleCardRemove(this._id);
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
