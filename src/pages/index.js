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
  profileEditAvatarButton,
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
const profileEditAvatarModalClass = new ModalWithForm(
  "#profile-edit-avatar-modal",
  handleProfileAvatar
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

let sectionClass;

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

function handleProfileAvatar() {
  console.log("hedhje");
}
//DELETE API
function handleDeleteCard(card) {
  api
    .deleteCard(card._id)
    .then((data) => {
      card.handleDeleteButton();
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    });
}

//PUT API / DELETE
function handleLikeCard(card) {
  console.log(card._isLiked);
  if (card._isLiked) {
    api.dislikeCard(card._id).then((data) => {
      card.handleLikeButton(false);
      console.log(data);
    });
    //dislike
  } else {
    api.likeCard(card._id).then((data) => {
      card.handleLikeButton(true);
      console.log(data);
    });

    console.log("like it");
  }
}

//Functions
function handleImageClick(cardData) {
  previewImageModalClass.open(cardData);
}

function createCard(item) {
  const cardElement = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeCard
  );
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

profileEditAvatarButton.addEventListener("click", () =>
  profileEditAvatarModalClass.open()
);

profileEditAvatarModalClass.setEventListeners();

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
