export default class UserInfo {
  constructor(profileTitleSelector, profileDescriptionSelector) {
    this._profileTitleElement = document.querySelector(profileTitleSelector);
    this._profileDescriptionElement = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      title: this._profileTitleElement.textContent,
      description: this._profileDescriptionElement.textContent.trim(),
    };
  }

  setUserInfo({ title, description }) {
    this._profileTitleElement.textContent = title;
    this._profileDescriptionElement.textContent = description;
  }
}
