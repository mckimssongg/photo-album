import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL_ADD_PHOTO,
  CLOSE_MODAL_ADD_PHOTO,
  OPEN_MODAL_DELETED_PHOTO,
  CLOSE_MODAL_DELETED_PHOTO,
} from "../constants/index";

const open = {
  type: OPEN_MODAL,
};

const closed = {
  type: CLOSE_MODAL,
};

const open_modal_add_photo = {
  type: OPEN_MODAL_ADD_PHOTO,
};

const closed_modal_add_photo = {
  type: CLOSE_MODAL_ADD_PHOTO,
};

const open_modal_deleted_photo = (image) => {
  return {
    type: OPEN_MODAL_DELETED_PHOTO,
    image,
  };
};

const closed_modal_deleted_photo = {
  type: CLOSE_MODAL_DELETED_PHOTO,
};

export {
  open,
  closed,
  open_modal_add_photo,
  closed_modal_add_photo,
  open_modal_deleted_photo,
  closed_modal_deleted_photo,
};
