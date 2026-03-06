const profileEditPopup = document.querySelector("#edit-popup");
const inputName = profileEditPopup.querySelector(".popup__input_type_name");
const inputDescription = profileEditPopup.querySelector(
  ".popup__input_type_description",
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
}

function handleOpenEditModal(modal) {
  // alert("Se está utilizando el handler que está en utils.js");
  openModal(modal);
  fillProfileForm();
}

export { handleOpenEditModal };
