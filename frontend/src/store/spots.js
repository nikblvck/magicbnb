import { csrfFetch } from "./csrf";

const LOAD = "spots/load";

const load = (spots, images) => {
  return{
    type: LOAD,
    spots,
    images
  }
}

//get all spots
export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    dispatch(load(spots));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case LOAD:
      newState = { ...state };
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
