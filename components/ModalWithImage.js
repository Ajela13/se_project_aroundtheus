import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._previewImage = this._modal.querySelector(".modal__image");
  }

  open(cardData) {
    this._previewImage.src = cardData.link;
    this._previewImage.textContent = cardData.name;
    this._previewImage.alt = cardData.alt;
    super.open();
  }
}
