import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._modalForm = this._modal.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._modalForm.querySelectorAll(".form__input");
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
