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

// Functions

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__description-name");
  const LikeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__trash");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  LikeButton.addEventListener("click", () => {
    LikeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImageDescription.textContent = cardData.name;
    previewImage.alt = cardData.name;
    openPopup(previewImageModal);
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
  closePopup(profileAddModal);
  profileAddForm.reset();
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openPopup(profileEditModal);
});

modalCloseEditButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileEditModal.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData));

profileAddButton.addEventListener("click", () => openPopup(profileAddModal));

profileAddModal.addEventListener("submit", handleAddCardFormSubmit);

modalCloseAddButton.addEventListener("click", () =>
  closePopup(profileAddModal)
);

const cardLikeButtons = document.querySelectorAll(".card__like-button");

previewCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);
