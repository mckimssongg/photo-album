import React from "react";
import FetchData from "../../services/Api";
import authUser from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { closed_modal_add_photo } from "../../store/actions/actions_modal";

function Add_a_photo_modal() {
  const user = authUser.getInstance();
  const dispatch = useDispatch();
  const getData = FetchData.getInstance();
  const [dataAlbums, setDataAlbums] = React.useState([]);
  const [onChange, setOnChange] = React.useState(false);

  const getDataAlbums = async () => {
    const response = await getData.fetch(
      `albums/albums/?userId=${user.dataUser.user.id}`,
      "GET"
    );
    setDataAlbums(response);
  };
  const [ver, setVer] = React.useState(false);
  const [data, setData] = React.useState({
    label: "",
    description: "",
    link: "",
    album: 0,
  });

  const [dataAlbum, setDataAlbum] = React.useState({
    user: user.dataUser.user.id,
    name: "",
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    if (ver === false) {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
    if (ver === true) {
      setDataAlbum({
        ...dataAlbum,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmitAlbum = async (e) => {
    e.preventDefault();
    const response = await getData.fetch("albums/albums/", "POST", dataAlbum);
    if (response.is_activate) {
      setOnChange(!onChange);
      dispatch(closed_modal_add_photo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getData.fetch("albums/image/", "POST", data);
    if (response.is_activate) {
      window.location.reload();
      dispatch(closed_modal_add_photo);
    }
  };

  React.useEffect(() => {
    getDataAlbums();
  }, [onChange]);

  return (
    <div
      className="form-bg bg-primary d-flex flex-column align-items-center "
      style={{ width: "100%", maxWidth: "600px" }}
    >
      {!ver ? (
        <>
          <h3 className="title text-center m-4">Add a photo 📷</h3>
          <form
            onSubmit={handleSubmit}
            className="form-horizontal d-flex flex-column "
            style={{ width: "80%", maxWidth: "600px" }}
          >
            <div className="form-group m-2 ">
              <label>Label of photo *</label>
              <input
                className="form-control"
                type="text"
                name="label"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2 ">
              <label>Description *</label>
              <input
                className="form-control"
                type="text"
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2 ">
              <label>Link *</label>
              <input
                className="form-control"
                type="text"
                name="link"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2 ">
              <label>Album *</label>
              <select
                className="form-control"
                name="album"
                onChange={handleChange}
              >
                <option value="0">Select an album</option>
                {dataAlbums.map((album) => (
                  <option key={album.id} value={album.id}>
                    {album.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button className="btn btn-outline-light m-3 w-50">Add</button>
              <button
                type="button"
                className="btn btn-outline-dark m-3 w-50"
                onClick={() => {
                  setVer(true);
                }}
              >
                New Album
              </button>
            </div>
            <button
              className="btn btn-primary m-3 "
              onClick={() => {
                dispatch(closed_modal_add_photo);
              }}
            >
              Canceled
            </button>
          </form>
        </>
      ) : (
        <>
          <h3 className="title text-center m-4">Add a album 📷</h3>
          <form
            onSubmit={handleSubmitAlbum}
            className="form-horizontal d-flex flex-column "
            style={{ width: "80%", maxWidth: "600px" }}
          >
            <div className="form-group m-2 ">
              <label>name*</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2 ">
              <label>Description *</label>
              <input
                className="form-control"
                type="text"
                name="description"
                onChange={handleChange}
              />
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <button className="btn btn-outline-light m-3 w-50">Add</button>
              <button
                type="button"
                className="btn btn-outline-dark m-3 w-50"
                onClick={() => {
                  setVer(false);
                }}
              >
                New photo
              </button>
            </div>
            <button
              className="btn btn-primary m-3 "
              onClick={() => {
                dispatch(closed_modal_add_photo);
              }}
            >
              Canceled
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Add_a_photo_modal;
