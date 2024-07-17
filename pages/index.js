import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";

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

const userInfoClass = new UserInfo("#profile-title", "#profile-description");
const profileTitleInput = document.querySelector("#profile-edit-title");
const profileDescriptionInput = document.querySelector(
  "#profile-edit-description"
);
const profileEditModalClass = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
const profileAddButton = document.querySelector("#profile-add-button");
const profileAddForm = document.forms["modal-add-form"];
const profileAddModalClass = new ModalWithForm(
  "#profile-add-modal",
  handleAddCardFormSubmit
);

const previewImageModalClass = new ModalWithImage("#preview_image_modal");

// Functions

const sectionClass = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);
sectionClass.renderItems();

function handleProfileFormSubmit(formData) {
  userInfoClass.setUserInfo(formData);
}

function handleImageClick(cardData) {
  previewImageModalClass.open(cardData);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getCardElement();
  sectionClass.addItem(cardElement);
}

function handleAddCardFormSubmit(obj) {
  const name = obj["title"];
  const link = obj["Image-link"];
  renderCard({ name, link });
  profileAddForm.reset();
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  const userData = userInfoClass.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  profileEditModalClass.open();
});

profileEditModalClass.setEventListeners();

profileAddButton.addEventListener("click", () => profileAddModalClass.open());

profileAddModalClass.setEventListeners();

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  button.closest(".modal");
});

previewImageModalClass.setEventListeners();

// Validation

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
