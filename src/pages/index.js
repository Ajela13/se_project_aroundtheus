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
  profileEditAvatarForm,
  profileEditForm,
  confirmationFormButton,
  confirmationForm,
} from "../utils/constants.js";
import "./index.css";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";

const api = new Api();
const userInfoClass = new UserInfo(
  "#profile-title",
  "#profile-description",
  "#profile-avatar"
);
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

const confirmationModalClass = new ModalWithConfirmation("#confirmation-modal");
const previewImageModalClass = new ModalWithImage("#preview_image_modal");

// GET API

api
  .getUserInfo()
  .then((data) => {
    userInfoClass.setUserInfo({ title: data.name, description: data.about });
    userInfoClass.setUserAvatar({
      avatar: data.avatar,
    });

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
  })
  .catch((error) => {
    console.error("Error fetching user info:", error);
  });

// PATCH API
function handleProfileFormSubmit(formData) {
  profileEditModalClass.setLoading(true, "Save");
  api
    .updateProfileInfo(formData.title, formData.description)
    .then((data) => {
      userInfoClass.setUserInfo({ title: data.name, description: data.about });
      profileEditModalClass.close();

      return data;
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    })
    .finally(() => {
      profileEditModalClass.setLoading(false, "Save");
      profileEditForm.reset();
      formValidators["modal-edit-form"].disableButton();
    });
}

function handleProfileAvatar(formData) {
  profileEditAvatarModalClass.setLoading(true, "Save");
  api
    .updateProfileAvatar(formData.avatar)
    .then((data) => {
      userInfoClass.setUserAvatar({
        avatar: data.avatar,
      });
      profileEditAvatarModalClass.close();
      return data;
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    })
    .finally(() => {
      profileEditAvatarModalClass.setLoading(false, "Save");
      profileEditAvatarForm.reset();
      formValidators["modal-edit-avatar-form"].disableButton();
    });
}

//POST API
function handleAddCardFormSubmit(obj) {
  profileAddModalClass.setLoading(true, "Create");
  const name = obj["title"];
  const link = obj["Image-link"];
  api
    .postCard(name, link)
    .then((card) => {
      sectionClass.addItem(card);
      profileAddModalClass.close();
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    })
    .finally(() => {
      profileAddModalClass.setLoading(false, "Create");
      profileAddForm.reset();
      formValidators["modal-add-form"].disableButton();
    });
}

//DELETE API
function handleDeleteCard(card) {
  confirmationModalClass.open();
  confirmationModalClass.setSubmitAction(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.handleDeleteButton();
      })

      .catch((error) => {
        console.error("Error fetching user info:", error);
      })
      .finally(() => {
        confirmationForm.reset();
        formValidators["modal-confirmation-form"].enableButton();
      });
  });
}

//PUT API / DELETE
function handleLikeCard(card) {
  if (card.isLiked()) {
    api
      .dislikeCard(card.getId())
      .then((data) => {
        card.handleLikeButton(false);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
      });
    //dislike
  } else {
    api
      .likeCard(card.getId())
      .then(() => {
        card.handleLikeButton(true);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
      });
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

confirmationModalClass.setEventListeners();

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
