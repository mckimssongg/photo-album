import React from "react";
import { closed } from "../store/actions/actions_modal";
import { loginFailure } from "../store/actions/actions_login";
import { useSelector, useDispatch } from "react-redux";

function Logout_modal() {
  const dispatch = useDispatch();

  return (
    <div
      className="form-bg bg-primary d-flex flex-column align-items-center rounded"
      style={{ width: "100%", maxWidth: "600px" }}
    >
      <h3 className="title text-center mt-4">¿log out now?</h3>
      <div className="d-flex w-100 px-4 justify-content-evenly">
        <button
          className="btn btn-danger my-3 w-50"
          onClick={() => {
            dispatch(
              loginFailure({
                message: "log out success",
                auth: false,
              })
            );
            window.location.reload();
            dispatch(closed);
          }}
        >
          log out
        </button>
        <button
          className="btn btn-primary my-3 "
          onClick={() => {
            dispatch(closed);
          }}
        >
          Canceled
        </button>
      </div>
    </div>
  );
}

export default Logout_modal;
