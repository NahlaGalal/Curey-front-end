import React, { useState } from "react";

const ChangePhoto = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const uploadImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    setImageName(file.name);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    if (e.target.files[0]) reader.readAsDataURL(file);
  };

  return (
    <React.Fragment>
      <h2 className="heading-2">Photo</h2>
      <p className="Popup__box__settings__description">
        Add a nice photo to your profile
      </p>
      <h4 className="heading-4">Image preview</h4>
      <img src={imageUrl || props.image} alt={`${props.name} profile-pic`} />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="fieldinput fieldinput-image">
          <span
            className={`fieldinput__input fieldinput-image__input${
              imageUrl ? " active" : ""
            }`}
          >
            {imageName || "Upload an image"}
          </span>
          <input
            name="image"
            id="image"
            type="file"
            hidden
            onChange={uploadImage}
            accept="image/*"
          />
          <label htmlFor="image">Upload</label>
        </div>
        <button type="submit" className="btn btn-green-dark btn-xxs">
          Save
        </button>
      </form>
    </React.Fragment>
  );
};

export default ChangePhoto;
