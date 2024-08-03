import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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

const api = new Api();
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

// GET API

api
  .getUserInfo()
  .then((data) => {
    userInfoClass.setUserInfo({ title: data.name, description: data.about });
    console.log(data);
    return data;
  })
  .catch((error) => {
    console.error("Error fetching user info:", error);
  });

let sectionClass = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);
sectionClass.renderItems();

api
  .getInitialCards()
  .then((cardList) => {
    sectionClass = new Section(
      { items: cardList, renderer: createCard },
      ".cards__list"
    );
    sectionClass.renderItems();
    console.log(cardList);
  })
  .catch((error) => {
    console.error("Error fetching user info:", error);
  });

// PATCH API
function handleProfileFormSubmit(formData) {
  console.log(formData);
  api
    .updateProfileInfo(formData.title, formData.description)
    .then((data) => {
      userInfoClass.setUserInfo({ title: data.name, description: data.about });
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    });
}

//POST API
function handleAddCardFormSubmit(obj) {
  const name = obj["title"];
  const link = obj["Image-link"];
  api
    .postCard(name, link)
    .then((card) => {
      sectionClass.addItem(card);
      profileAddForm.reset();
      console.log(card);
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    });
}

//Functions
function handleImageClick(cardData) {
  previewImageModalClass.open(cardData);
}

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.getCardElement();
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
