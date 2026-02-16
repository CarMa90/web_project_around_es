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

function closeModal(modal) {
  if (modal.classList.contains("popup_is-opened")) {
    // alert("Se está utilizando el handler que está en utils.js");
    modal.classList.remove("popup_is-opened");
  }
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

function handleProfileFormSubmit(evt) {
  // alert("Se está utilizando el handler que está en utils.js");
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  evt.target.reset();
  closeModal(profileEditPopup);
}

export { handleOpenEditModal, handleProfileFormSubmit, closeModal, openModal };
