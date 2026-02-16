export function handleCardFormSubmit() {
  const newCardPopup = document.querySelector("#new-card-popup");
  const inputNewCardName = newCardPopup.querySelector(
    ".popup__input_type_card-name",
  );
  const inputNewCardUrl = newCardPopup.querySelector(".popup__input_type_url");
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");

  const card = new Card(
    {
      name: inputNewCardName.value,
      link: inputNewCardUrl.value,
    },
    cardTemplate,
  );
  card.renderCard();
}

export class Card {
  constructor(data, template) {
    this.name = data.name || "Sin título";
    this.link = data.link || "./images/placeholder.jpg";
    this.template = template;
  }

  _getTemplate() {
    const cardElement = this.template.cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    const cardLikeBtn = cardElement.querySelector(".card__like-button");
    const cardRemoveBtn = cardElement.querySelector(".card__delete-button");

    cardLikeBtn.addEventListener("click", (e) => {
      this._handleCardLikes(cardLikeBtn);
    });

    cardRemoveBtn.addEventListener("click", (e) => {
      this._handleCardRemove(cardElement);
    });

    cardImage.addEventListener("click", (e) => {
      this._handleOpenImageModal();
    });

    cardTitle.textContent = this.name;
    cardImage.src = this.link;
    cardImage.alt = this.name;

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

  _handleOpenImageModal() {
    const imageModal = document.querySelector("#image-popup");
    imageModal.classList.add("popup_is-opened");
    imageModal.querySelector(".popup__image").src = this.link;
    imageModal.querySelector(".popup__image").alt = this.name;
    imageModal.querySelector(".popup__caption").textContent = this.name;
  }

  _generateCard() {
    this.element = this._getTemplate();

    return this.element;
  }

  renderCard() {
    const card = this._generateCard();

    document.querySelector(".cards__list").prepend(card);
  }
}
