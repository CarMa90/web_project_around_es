import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { handleOpenEditModal } from "../utils/utils.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

const api = new Api({
  url: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "288e77e1-cc55-482e-83a6-7664a6a338f5",
    "content-type": "application/json",
  },
});

api
  .getUserInfo()
  .then((result) => {
    // console.log(result);
    userInfo.setUserInfo({
      name: result.name,
      description: result.about,
    });
  })
  .catch((err) => console.log(err));

function renderSection(cards, method) {
  const cardsFromServer = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = new Card(
          item,
          cardTemplate,
          {
            handleCardClick: () => {
              imagePopupInstance.open({
                link: card.link,
                name: card.name,
              });
              imagePopupInstance.setEventListeners();
            },
          },
          {
            handleDeleteClick: (cardId) => {
              confirmationPopupInstance.open(cardId);
            },
          },
          {
            handleLikeClick: (cardLikeBtn, cardId) => {
              api
                .handleCardLikes({ id: cardId, card: cardLikeBtn })
                .then((res) =>
                  cardLikeBtn.classList.toggle("card__like-button_is-active"),
                );
            },
          },
        );
        const cardElement = card._generateCard();
        cardsFromServer.addItem(cardElement, method);
      },
    },
    ".cards__list",
    method,
  );
  cardsFromServer.renderItems();
}

function renderAllCards() {
  api
    .getInitialCards()
    .then((cards) => {
      document.querySelector(".cards__list").innerHTML = ``;
      renderSection(cards, "append");
    })
    .catch((err) => console.log(err));
}

document.addEventListener("DOMContentLoaded", (e) => {
  renderAllCards();
  loadProfilePicture();
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

function addNewCard(inputValues) {
  const formBtn = document.querySelector("#new-card-popup .popup__button");
  formBtn.textContent = "Guardando...";
  api
    .getNewCard({
      body: JSON.stringify({
        name: inputValues["place-name"],
        link: inputValues.link,
      }),
      method: "POST",
    })
    .then((newCard) => {
      renderSection([newCard], "prepend");
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formBtn.textContent = "Crear";
    });
}

const popupWithFormInstance = new PopupWithForm("#new-card-popup", {
  submitForm: (evt) => {
    evt.preventDefault();
    addNewCard(popupWithFormInstance._getInputValues());
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
  handleOpenEditModal(profileEditPopup);
});

function userActualization({ description, name }) {
  const formBtn = document.querySelector("#edit-popup .popup__button");
  formBtn.textContent = "Guardando...";
  api
    .setUserInfo({
      body: JSON.stringify({
        name: name,
        about: description,
      }),
      method: "PATCH",
    })
    .then((user) => {
      userInfo.setUserInfo({ description: user.about, name: user.name });
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formBtn.textContent = `Guardar`;
    });
}

const profileEditPopupInstance = new PopupWithForm("#edit-popup", {
  submitForm: (evt) => {
    evt.preventDefault();
    userActualization(profileEditPopupInstance._getInputValues());
    evt.target.reset();
    profileEditPopupInstance.close();
  },
});

profileEditPopupInstance.setEventListeners();
profileEditPopupInstance._getInputValues();

const imagePopupInstance = new PopupWithImage("#image-popup");

const forms = d.querySelectorAll(".popup__form");

forms.forEach((el) => {
  const form = new FormValidator(el, el.querySelectorAll(".popup__input"));
  // form.showInformation();
  form.setEventListeners();
});

const confirmationPopupInstance = new PopupWithConfirmation(
  "#confirmation-popup",
  {
    submitForm: () => {
      const cardId = confirmationPopupInstance._getInputValues();
      api
        .deleteCard({ method: "DELETE", cardId: cardId["card-id"] })
        .then((card) => {
          confirmationPopupInstance.close();
          renderAllCards();
        })
        .catch((err) => console.log(err));
    },
  },
);
confirmationPopupInstance.setEventListeners();

function loadProfilePicture() {
  api
    .getUserInfo()
    .then((data) => {
      document.querySelector(".profile__image").src = data.avatar;
      document.querySelector(".profile__image").alt = "Avatar";
    })
    .catch((err) => console.log(err));
}

function changeProfilePicture(url) {
  const formBtn = document.querySelector("#profile-image-popup .popup__button");
  formBtn.textContent = "Guardando...";
  api
    .changeProfilePicture({
      body: JSON.stringify({ avatar: url }),
      method: "PATCH",
    })
    .then((data) => {
      // console.log(data);
      profileImagePopupInstance.close();
      document.querySelector(".profile__image").src = data.avatar;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formBtn.textContent = "Guardar";
    });
}

const profileImagePopupInstance = new PopupWithForm("#profile-image-popup", {
  submitForm: (e) => {
    e.preventDefault();
    // console.log(profileImagePopupInstance._getInputValues());
    const url = profileImagePopupInstance._getInputValues()["profile-image"];
    // console.log(url);
    changeProfilePicture(url);
  },
});

profileImagePopupInstance.setEventListeners();

const profilePictureEditBtn = document.querySelector(
  ".profile__image-container",
);

profilePictureEditBtn.addEventListener("click", (e) =>
  profileImagePopupInstance.open(),
);
