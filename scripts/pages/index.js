import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { handleOpenEditModal } from "../utils/utils.js";

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
const cardTemplate = d
  .querySelector("#card-template")
  .content.querySelector(".card");
const profileAddBtn = d.querySelector(".profile__add-button");

profileAddBtn.addEventListener("click", (e) => {
  // openModal(newCardPopup);
  const popup = new Popup("#new-card-popup");
  popup.setEventListeners();
  popup.open();
});

function handleCardFormSubmit(inputValues) {
  // console.log(inputValues);
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");

  const card = new Card(
    {
      name: inputValues["place-name"],
      link: inputValues.link,
    },
    cardTemplate,
    {
      handleCardClick: () => {
        imagePopupInstance.open({ link: card.link, name: card.name });
        imagePopupInstance.setEventListeners();
      },
    },
  );

  const cardElement = card._generateCard();

  defaultCards.addItem(cardElement);
}

const popupWithFormInstance = new PopupWithForm("#new-card-popup", {
  submitForm: (evt) => {
    // alert("hola mundo");
    // console.log("Hola Mundo");
    evt.preventDefault();
    handleCardFormSubmit(popupWithFormInstance._getInputValues());
    evt.target.reset();
    popupWithFormInstance.close();
  },
});

popupWithFormInstance.setEventListeners();
popupWithFormInstance._getInputValues();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

profileEditBtn.addEventListener("click", (e) => {
  // console.log(e.target);
  handleOpenEditModal(profileEditPopup);
  // profileEditPopupInstance.open();
});

const profileEditPopupInstance = new PopupWithForm("#edit-popup", {
  submitForm: (evt) => {
    // alert("hola mundo");
    // handleProfileFormSubmit(profileEditPopupInstance._getInputValues());
    evt.preventDefault();
    userInfo.setUserInfo(profileEditPopupInstance._getInputValues());
    evt.target.reset();
    profileEditPopupInstance.close();
  },
});

profileEditPopupInstance.setEventListeners();
profileEditPopupInstance._getInputValues();

const imagePopupInstance = new PopupWithImage("#image-popup");

const defaultCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplate, {
        handleCardClick: () => {
          imagePopupInstance.open({
            link: card.link,
            name: card.name,
          });
          imagePopupInstance.setEventListeners();
        },
      });

      const cardElement = card._generateCard();
      defaultCards.addItem(cardElement);
    },
  },
  ".cards__list",
);

defaultCards.renderItems();

const forms = d.querySelectorAll(".popup__form");

forms.forEach((el) => {
  const form = new FormValidator(el, el.querySelectorAll(".popup__input"));
  // form.showInformation();
  form.setEventListeners();
});
