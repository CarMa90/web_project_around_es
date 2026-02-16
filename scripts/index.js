import { Card, handleCardFormSubmit } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  handleOpenEditModal,
  handleProfileFormSubmit,
  closeModal,
  openModal,
} from "./utils.js";

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
const formElement = d.querySelector("#edit-profile-form");
const cardTemplate = d
  .querySelector("#card-template")
  .content.querySelector(".card");
const profileAddBtn = d.querySelector(".profile__add-button");
const newCardPopup = d.querySelector("#new-card-popup");
const newCardClosePopupBtn = newCardPopup.querySelector(".popup__close");
const newCardFormElement = d.querySelector("#new-card-form");
const imagePopup = d.querySelector("#image-popup");
const imageClosePopupBtn = imagePopup.querySelector(".popup__close");

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

newCardFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  handleCardFormSubmit();
  e.target.reset();
  closeModal(newCardPopup);
});

imageClosePopupBtn.addEventListener("click", (e) => {
  closeModal(imagePopup);
});

initialCards.forEach((el) => {
  const card = new Card(el, cardTemplate);
  card.renderCard();
});

const forms = d.querySelectorAll(".popup__form");

forms.forEach((el) => {
  const form = new FormValidator(el, el.querySelectorAll(".popup__input"));
  // form.showInformation();
  form.setEventListeners();
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

imagePopup.addEventListener("click", (e) => {
  if (
    !(
      e.target.matches(".popup__content *") ||
      e.target.matches(".popup__content")
    )
  ) {
    closeModal(imagePopup);
  }
});

d.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(newCardPopup);
    closeModal(profileEditPopup);
    closeModal(imagePopup);
  }
});
