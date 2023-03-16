import React from "react";
import FetchData from "../services/Api";
import { useSelector, useDispatch } from "react-redux";
import { closed } from "../store/actions/actions_modal";
import { loginFailure, loginSuccess } from "../store/actions/actions_login";

function Form_login() {
  const dispatch = useDispatch();
  const [ver, setVer] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const [dataRegister, setDataRegister] = React.useState({
    email: "",
    password: "",
    password_confirm: "",
    username: "",
  });

  const [error, setError] = React.useState(false);

  const handleChange = (e) => {
    if (!ver) {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    } else {
      setDataRegister({
        ...dataRegister,
        [e.target.name]: e.target.value,
      });
    }
  };

  const getData = FetchData.getInstance();
  const [done, setDone] = React.useState(false);
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const register = await getData.fetchWithoutToken(
      "users/users",
      "POST",
      dataRegister
    );
    if (register.username) {
      setDone(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = await getData.fetchWithoutToken(
      "users/login",
      "POST",
      data
    );
    console.log(loginData);
    if (loginData.auth) {
      dispatch(loginSuccess(loginData));

      window.location.reload();
      dispatch(closed);
    } else {
      setError(true);
      dispatch(loginFailure(loginData));
    }
  };

  return (
    <div
      className="form-bg bg-primary d-flex flex-column align-items-center "
      style={{ width: "100%", maxWidth: "600px" }}
    >
      {!ver ? (
        <React.Fragment>
          <h3 className="title text-center m-4">log in now</h3>
          {error && <p className="text-danger">Wrong email or password</p>}
          <form
            onSubmit={handleSubmit}
            className="form-horizontal d-flex flex-column "
            style={{ width: "80%", maxWidth: "600px" }}
          >
            <div className="form-group m-2 ">
              <label>User Name*</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2">
              <label>Password*</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button className="btn btn-outline-light m-3 w-50">log In</button>
              <button
                className="btn btn-outline-dark m-3 w-50"
                onClick={() => {
                  setVer(true);
                }}
              >
                Sing Up
              </button>
            </div>
            <button
              className="btn btn-primary m-3 "
              onClick={() => {
                dispatch(closed);
              }}
            >
              Canceled
            </button>
          </form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3 className="title text-center m-4">Register</h3>
          {done && <p className="text-success">Success</p>}
          <form
            onSubmit={handleSubmitRegister}
            className="form-horizontal d-flex flex-column "
            style={{ width: "80%", maxWidth: "600px" }}
          >
            <div className="form-group m-2 ">
              <label>User Name*</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2">
              <label>Email ID*</label>
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2">
              <label>Password*</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2">
              <label>Confirm Password*</label>
              <input
                className="form-control"
                type="password"
                name="password_confirmation"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-light m-3 w-50 ">
                Register now
              </button>

              <button
                className="btn btn-outline-dark m-3 w-50"
                onClick={() => {
                  setVer(false);
                }}
              >
                Login
              </button>
            </div>
          </form>
        </React.Fragment>
      )}
    </div>
  );
}

export default Form_login;
