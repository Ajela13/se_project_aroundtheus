import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._confirmationModalForm = this._modal.querySelector(".modal__form");
  }
  setSubmitAction(Action) {
    this._submitAction = Action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmationModalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitAction();
      this.close();
    });
  }
}
