export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = cardSelector.cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardNameEl = this._cardElement.querySelector(
      ".card__description-name"
    );
    this._deleteButton = this._cardElement.querySelector(".card__trash");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton(this)
    );

    this._likeButton.addEventListener("click", () =>
      this._handleLikeButton(this)
    );
  }

  _handleDeleteButton() {
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  getCardElement() {
    this._cardImageElement.src = this._link;
    this._cardNameEl.textContent = this._name;
    this._cardImageElement.alt = this._alt;

    this._setEventListeners();

    return this._cardElement;
  }
}
