export const validationDict = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_inactive",
  inputErrorClass: "form__item-error",
  errorClass: "form__error_active",
}; //словарь для валидации форм
// не забываем поменять baseurl
export const baseUrl = "https://api.myproject.nomoredomains.sbs";
// export const baseUrl = "http://localhost:3000";

export const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
};
