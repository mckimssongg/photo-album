import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import "../assets/css/Content_Images.css";
import { open_modal_deleted_photo } from "../store/actions/actions_modal";
import { useDispatch } from "react-redux";

function Image({ image }) {
  const dispatch = useDispatch();
  return (
    <>
      <img src={image.link} alt={image.label} />
      <p>{image.label}</p>
      {image.is_activate ? (
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(open_modal_deleted_photo(image));
          }}
        >
          <RiDeleteBin6Fill />
        </button>
      ) : null}
    </>
  );
}
export default Image;
