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
