let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (card) {
  console.log(card["name"]);
});

const d = document;
const profileEditBtn = d.querySelector(".profile__edit-button");
const profileEditPopup = d.querySelector("#edit-popup");
const profileClosePopupBtn = profileEditPopup.querySelector(".popup__close");
const profileTitle = d.querySelector(".profile__title");
const profileDescription = d.querySelector(".profile__description");
const inputName = profileEditPopup.querySelector(".popup__input_type_name");
const inputDescription = profileEditPopup.querySelector(
  ".popup__input_type_description"
);
const formElement = d.querySelector("#edit-profile-form");
const cardsList = d.querySelector(".cards__list");
const cardTemplate = d
  .querySelector("#card-template")
  .content.querySelector(".card");
const profileAddBtn = d.querySelector(".profile__add-button");
const newCardPopup = d.querySelector("#new-card-popup");
const newCardClosePopupBtn = newCardPopup.querySelector(".popup__close");
const inputNewCardName = newCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const inputNewCardUrl = newCardPopup.querySelector(".popup__input_type_url");
const newCardFormElement = d.querySelector("#new-card-form");
const imagePopup = d.querySelector("#image-popup");
const imageClosePopupBtn = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupTitle = imagePopup.querySelector(".popup__caption");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
}
function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  evt.target.reset();
  closeModal(profileEditPopup);
}

profileEditBtn.addEventListener("click", (e) => {
  // console.log(e.target);
  handleOpenEditModal(profileEditPopup);
});

profileClosePopupBtn.addEventListener("click", (e) => {
  // console.log(e.target);
  closeModal(profileEditPopup);
});

formElement.addEventListener("submit", handleProfileFormSubmit);

profileAddBtn.addEventListener("click", (e) => {
  openModal(newCardPopup);
});
newCardClosePopupBtn.addEventListener("click", (e) => {
  closeModal(newCardPopup);
});

function handleCardFormSubmit() {
  // console.log(inputNewCardName.value);
  // console.log(inputNewCardUrl.value);
  renderCard(inputNewCardName.value, inputNewCardUrl.value, cardsList);
  closeModal(newCardPopup);
}

newCardFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  handleCardFormSubmit();
  e.target.reset();
});

function handleCardLikes(card) {
  card.classList.toggle("card__like-button_is-active");
}

function handleCardRemove(card) {
  card.remove();
}

function handleOpenImageModal(card) {
  openModal(imagePopup);
  // console.log(card);
  imagePopupImage.src = card.querySelector(".card__image").src;
  imagePopupImage.alt = card.querySelector(".card__title").textContent;
  imagePopupTitle.textContent = card.querySelector(".card__title").textContent;
}

imageClosePopupBtn.addEventListener("click", (e) => {
  closeModal(imagePopup);
});

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg"
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardRemoveBtn = cardElement.querySelector(".card__delete-button");

  cardLikeBtn.addEventListener("click", (e) => {
    handleCardLikes(cardLikeBtn);
  });

  cardRemoveBtn.addEventListener("click", (e) => {
    handleCardRemove(cardElement);
  });

  cardImage.addEventListener("click", (e) => {
    handleOpenImageModal(cardElement);
  });

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
}

function renderCard(name, link, container) {
  container.prepend(getCardElement(name, link));
}

initialCards.forEach((el) => renderCard(el.name, el.link, cardsList));

const forms = d.querySelectorAll(".popup__form");

function showErrorMessage(input, errorMessage) {
  const $errorMessageSpan = d.querySelector(`.${input.name}-error-message`);
  $errorMessageSpan.textContent = errorMessage;
}

function hideErrorMessage(input) {
  const $errorMessageSpan = d.querySelector(`.${input.name}-error-message`);
  $errorMessageSpan.textContent = "";
}

function chechkInputValidity(input) {
  if (!input.validity.valid) {
    showErrorMessage(input, input.validationMessage);
  } else {
    hideErrorMessage(input);
  }
}

function toggleDisableButton(form) {
  const submitBtn = form.querySelector(".popup__button");
  if (!form.checkValidity()) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
}

forms.forEach((form) => {
  const inputs = form.querySelectorAll(".popup__input");

  form.addEventListener("input", (e) => {
    toggleDisableButton(form);
  });

  form.addEventListener("submit", (e) => {
    toggleDisableButton(form);
  });

  d.addEventListener("click", (e) => {
    if (
      e.target.matches(".profile__edit-button") ||
      e.target.matches(".profile__add-button")
    ) {
      toggleDisableButton(form);
    }
  });

  inputs.forEach((input) => {
    // console.log(input);
    input.addEventListener("input", (e) => {
      chechkInputValidity(input);
    });

    d.addEventListener("click", (e) => {
      if (
        e.target.matches(".profile__edit-button") ||
        e.target.matches(".profile__add-button")
      ) {
        chechkInputValidity(input);
      }
    });
  });
});

profileEditPopup.addEventListener("click", (e) => {
  if (
    !(
      e.target.matches(".popup__content *") ||
      e.target.matches(".popup__content")
    )
  ) {
    closeModal(profileEditPopup);
  }
});

newCardPopup.addEventListener("click", (e) => {
  if (
    !(
      e.target.matches(".popup__content *") ||
      e.target.matches(".popup__content")
    )
  ) {
    closeModal(newCardPopup);
  }
});

d.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(newCardPopup);
    closeModal(profileEditPopup);
  }
});
