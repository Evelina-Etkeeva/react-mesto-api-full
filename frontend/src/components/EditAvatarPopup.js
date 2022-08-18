import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarValue = React.useRef();
  const [link, setLink] = React.useState("");
  const [linkValid, setLinkValid] = React.useState(true);
  const [errorLink, setErrorLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      avatar_img:
        avatarValue.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
  }
  React.useEffect(() => {
    avatarValue.current.value = "";
    setErrorLink("");
    setLinkValid(true);
  }, [props.isOpen]);

  function handleLinkChange(e) {
    setLink(e.target.value);
    setLinkValid(e.target.validity.valid);
    setErrorLink(e.target.validationMessage);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Обновить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onButton={linkValid}
    >
      <input
        ref={avatarValue}
        type="url"
        className="form__item form__item_el_avatar-img"
        id="avatar_img"
        name="avatar_img"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span
        className={`avatar-img-error ${
          errorLink && "form__error_active"
        } form__span`}
      >
        {errorLink}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
