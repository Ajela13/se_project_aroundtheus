export default class UserInfo {
  constructor(profileTitleSelector, profileDescriptionSelector) {
    this._profileTitleSelector = document.querySelector(profileTitleSelector);
    this._profileDescriptionSelector = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      title: this._profileTitleSelector.textContent,
      description: this._profileDescriptionSelector.textContent.trim(),
    };
  }

  setUserInfo({ title, description }) {
    this._profileTitleSelector.textContent = title;
    this._profileDescriptionSelector.textContent = description;
  }
}
