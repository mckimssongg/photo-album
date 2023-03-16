import React from "react";
import { MdAdd } from "react-icons/md";
import {open_modal_add_photo} from "../store/actions/actions_modal";
import {useDispatch} from "react-redux";

function Add_a_photo_button({color}) {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        type="button"
        className={`btn btn-${color} d-flex align-items-center`}
        onClick={() => {
          dispatch(open_modal_add_photo);
        }}
      >
        <MdAdd/> Add a photo
      </button>
    </div>
  );
}

export default Add_a_photo_button;
