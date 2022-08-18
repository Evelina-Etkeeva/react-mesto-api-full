import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [nameValid, setNameValid] = React.useState(true);
  const [linkValid, setLinkValid] = React.useState(true);
  const [errorName, setErrorName] = React.useState("");
  const [errorLink, setErrorLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
    setErrorName("");
    setErrorLink("");
    setNameValid(true);
    setLinkValid(true);
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
    setNameValid(e.target.validity.valid);
    setErrorName(e.target.validationMessage);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    setLinkValid(e.target.validity.valid);
    setErrorLink(e.target.validationMessage);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onSubmit([name, link]);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onButton={nameValid && linkValid}
    >
      <input
        type="text"
        className="form__item form__item_el_place-name"
        id="place-name"
        name="place-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span
        className={`place-name-error ${
          errorName && "form__error_active"
        } form__span`}
      >
        {errorName}
      </span>
      <input
        type="url"
        className="form__item form__item_el_place-img"
        id="place-img"
        name="place-img"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span
        className={`place-img-error ${
          errorLink && "form__error_active"
        } form__span`}
      >
        {errorLink}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
