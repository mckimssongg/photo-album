import React from "react";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { open } from "../store/actions/actions_modal";

function Logout({ name }) {
  const dispatch = useDispatch();
  return (
    <button
      className="btn btn-success me-3 btn-lg"
      onClick={() => {
        dispatch(open);
      }}
    >
      <RiLogoutBoxFill />
      {name}
    </button>
  );
}

export default Logout;
