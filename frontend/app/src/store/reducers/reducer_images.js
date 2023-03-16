import { FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE } from "../constants/index";

const initialState = {
  images: [
    {
      id: 1,
      label: "image1",
      link: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      label: "image2",
      link: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2021/09/23/614c6b7c5f203.jpeg",
    },
    {
      id: 3,
      label: "image3",
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlYMexkKdqiADGxu2yFBFHopSQN_3KtCHNojTpYaCWKoVN5mxM-txbqXH2y3As30AxjYA&usqp=CAU",
    },
  ],
  error: null,
};

const reducer_images = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.data ? action.data.concat(initialState.images) : initialState.images,
        error: null,
      };
    case FETCH_IMAGES_FAILURE:
      return {
        ...state,
        images: state.images,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer_images;
