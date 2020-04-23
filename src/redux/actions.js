import axios from "axios";
import * as TYPES from "./actionTypes";

const END_POINT = "https://api.spacexdata.com/v3";

const getUpcomingCapsules = (dispatch) => {
  dispatch({ type: TYPES.API_BUSY, payload: true });
  axios
    .get(`${END_POINT}/capsules/upcoming`, { crossdomain: true })
    .then((response) => {
      dispatch({
        type: TYPES.GET_CAPSULES_SUCCESS,
        payload: (response.data || []).sort((a, b) => {
          const dateA = a.original_launch ? new Date(a.original_launch) : 0;
          const dateB = b.original_launch ? new Date(b.original_launch) : 0;
          return dateA - dateB;
        }),
      });
    })
    .catch((error) => dispatch({ type: TYPES.API_ERROR, payload: error }));
};

const getLandingPad = (key) => (dispatch) => {
  dispatch({ type: TYPES.API_BUSY, payload: true });
  axios
    .get(`${END_POINT}/landpads/${key.toUpperCase()}`, { crossdomain: true })
    .then((response) => {
      dispatch({
        type: TYPES.LANDING_PAD_SUCCESS,
        payload: response.data || [],
      });
    })
    .catch((error) => dispatch({ type: TYPES.API_ERROR, payload: error }));
};

export default { getUpcomingCapsules, getLandingPad };
