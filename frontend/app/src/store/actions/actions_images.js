import { FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE } from "../constants/index";

const fetchImagesSuccess = (data) => {
  return {
    type: FETCH_IMAGES_SUCCESS,
    data,
  };
};

const fetchImagesFailure = () => {
  return {
    type: FETCH_IMAGES_FAILURE,
  };
};

export { fetchImagesSuccess, fetchImagesFailure };
