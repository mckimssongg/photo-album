import React from "react";
import "../../assets/css/Content_Images.css";
import FetchData from "../../services/Api";
import authUser from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchImagesSuccess,
  fetchImagesFailure,
} from "../../store/actions/actions_images";
import { Modal } from "../modals/index";
import { closed_modal_deleted_photo } from "../../store/actions/actions_modal";
import Delete_photo_modal from "../modals/delet_a_photo_modal/";
import Image from "../Image";

function Content_Images() {
  const dispatch = useDispatch();
  const getData = FetchData.getInstance();
  const auth = authUser.getInstance();
  const images = useSelector((state) => state.reducer_images.images);
  const imagen_seleccionada = useSelector(
    (state) => state.visibilityModal.image
  );
  const visibility_deleted_photo = useSelector(
    (state) => state.visibilityModal.visibility_deleted_photo
  );
  const fetchImages = async () => {
    if (auth.dataUser.user !== undefined) {
      const data = await getData.fetch(
        `albums/searchImage/?userId=${auth.dataUser.user.id}`,
        "GET"
      );
      dispatch(fetchImagesSuccess(data));
    } else {
      dispatch(fetchImagesFailure());
    }
  };

  React.useEffect(() => {
    fetchImages();
  }, [imagen_seleccionada]);
  return (
    <React.Fragment>
      <section id="Gallery" className="m-3">
        <div className="row">
          {images.map((image, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="col-12 col-md-6 col-lg-4 col-xl-3 content-image mb-3"
            >
              <Image image={image} />
            </div>
          ))}
        </div>
      </section>
      {visibility_deleted_photo ? (
        <Modal>
          <Delete_photo_modal
            dataImage={imagen_seleccionada}
            action={() => {
              dispatch(closed_modal_deleted_photo);
            }}
          />
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

export default Content_Images;
