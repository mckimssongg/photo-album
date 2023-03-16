import { combineReducers } from "redux";
import { visibilityModal } from "./reducers/reducers_modals";
import reducer_images from "./reducers/reducer_images";
import  reducer_login  from "./reducers/reducer_login";

const AppUI = combineReducers({
  visibilityModal,
  reducer_login,
  reducer_images,
});

import { createStore } from 'redux';
let store = createStore(AppUI);
export default store;
