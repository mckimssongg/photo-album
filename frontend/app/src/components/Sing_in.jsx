import React from "react";
import { HiUserCircle } from "react-icons/hi";
import { open } from "../store/actions/actions_modal";
import { useSelector, useDispatch } from "react-redux";

function Sing_in() {
  const dispatch = useDispatch();
  return (
    <button
      className=" btn text-white"
      onClick={() => {
        dispatch(open);
      }}
    >
      <div className="d-flex align-items-center">
        <HiUserCircle />
        Sing In
      </div>
    </button>
  );
}

export default Sing_in;
