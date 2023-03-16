import React from "react";
import FetchData from "../../services/Api";

function Delete_photo_modal({ dataImage, action }) {
  const getData = FetchData.getInstance();

  const data = {
    label: dataImage.label,
    description: dataImage.description,
    link: dataImage.link,
    album: dataImage.album,
    is_activate: false,
  };

  const putDeletPhot = async () => {
    const response = await getData.fetch(
      `albums/image/${dataImage.id}/`,
      "PUT",
      data
    );
    action();
  };

  
  return (
    <div
      className="form-bg bg-primary d-flex flex-column align-items-center "
      style={{ width: "100%", maxWidth: "600px" }}
    >
      <h3 className="title text-center m-4">Deleted this is photo? 📷</h3>

      <img src={dataImage.link} alt={dataImage.label} />
      <div className="d-flex align-items-center justify-content-center">
        <button
          className="btn btn-outline-light m-3 w-50"
          onClick={() => {
            putDeletPhot(data);
          }}
        >
          Deleted ❌
        </button>
        <button
          className="btn btn-primary m-3 "
          onClick={() => {
            action();
          }}
        >
          Canceled
        </button>
      </div>
    </div>
  );
}

export default Delete_photo_modal;
