import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileAddButton,
  profileAddForm,
  validationConfig,
} from "../utils/constants.js";
import "./index.css";

const userInfoClass = new UserInfo("#profile-title", "#profile-description");
const profileAddModalClass = new ModalWithForm(
  "#profile-add-modal",
  handleAddCardFormSubmit
);
const profileEditModalClass = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
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

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.getCardElement();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
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

previewImageModalClass.setEventListeners();

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
