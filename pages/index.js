import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "Yosemite picture",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "Lake picture",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "Bald picture",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "Latemar picture",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "Vanoise picture",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    alt: "Lago picture",
  },
];

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-edit-title");
const profileDescriptionInput = document.querySelector(
  "#profile-edit-description"
);
const modalCloseEditButton = document.querySelector("#modal-close-edit-button");
const profileEditForm = document.forms["modal-edit-form"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const profileAddButton = document.querySelector("#profile-add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const modalCloseAddButton = document.querySelector("#modal-close-add-button");
const profileAddForm = document.forms["modal-add-form"];
const cardTitleInput = profileAddForm.querySelector("#profile-add-title");
const cardImageLinkInput = profileAddForm.querySelector(
  "#profile-add-image-link"
);

const previewImageModal = document.querySelector("#preview_image_modal");
const previewImage = previewImageModal.querySelector("#preview-image");
const previewCloseButton = previewImageModal.querySelector(
  ".modal__close-preview"
);
const previewImageDescription = previewImageModal.querySelector(
  ".preview_modal_description"
);

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(validationConfig, profileAddForm);

// Functions

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    if (modal) {
      closeModal(modal);
    }
  }
}

function handleClickOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  modal.removeEventListener("click", handleEscapeKey);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("click", handleClickOverlay);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function renderCard(cardData, method = "prepend") {
  const cardElement = getCardElement(cardData);
  cardListEl[method](cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__description-name");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__trash");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImageDescription.textContent = cardData.name;
    previewImage.alt = cardData.name;
    openModal(previewImageModal);
  });

  cardNameEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.alt;
  return cardElement;
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageLinkInput.value;
  renderCard({ name, link });
  closeModal(profileAddModal);
  profileAddForm.reset();
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

profileEditModal.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData));

profileAddButton.addEventListener("click", () => openModal(profileAddModal));

profileAddModal.addEventListener("submit", handleAddCardFormSubmit);

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
