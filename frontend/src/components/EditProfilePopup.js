import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameValid, setNameValid] = React.useState(true);
  const [descriptionValid, setDescriptionValid] = React.useState(true);
  const [errorName, setErrorName] = React.useState("");
  const [errorDescription, setErrorDescription] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setErrorName("");
    setErrorDescription("");
    setNameValid(true);
    setDescriptionValid(true);
  }, [props.isOpen]);
  
  function handleNameChange(e) {
    setName(e.target.value);
    setNameValid(e.target.validity.valid);
    setErrorName(e.target.validationMessage);
  }

  function handleDescriprtionChange(e) {
    setDescription(e.target.value);
    setDescriptionValid(e.target.validity.valid);
    setErrorDescription(e.target.validationMessage);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onSubmit([name, description]);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onButton={nameValid && descriptionValid}
    >
      <input
        type="text"
        value={name || ""}
        onChange={handleNameChange}
        className="form__item form__item_el_name"
        id="el-name"
        name="el-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className={`el-name-error ${
          errorName && "form__error_active"
        } form__span`}>{errorName}</span>
      <input
        type="text"
        value={description || ""}
        onChange={handleDescriprtionChange}
        className="form__item form__item_el_about-me"
        id="about-me"
        name="about-me"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className={`about-me-error ${
          errorDescription && "form__error_active"
        } form__span`}>{errorDescription}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
