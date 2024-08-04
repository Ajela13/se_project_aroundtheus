export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector =
      document.querySelector(cardSelector).content.firstElementChild;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleImageClick = handleImageClick;
    this._cardElement = this._cardSelector.cloneNode(true);
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
      this._handleDeleteCard(this)
    );

    this._likeButton.addEventListener("click", () =>
      this._handleLikeCard(this)
    );
  }

  handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  handleLikeButton(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _updateLikeIcon() {
    if (this._isLiked) {
      this.handleLikeButton(this._isLiked);
    }
  }

  getCardElement() {
    this._cardImageElement.src = this._link;
    this._cardNameEl.textContent = this._name;
    this._cardImageElement.alt = this._alt;
    this._setEventListeners();
    this._updateLikeIcon();
    return this._cardElement;
  }
}
