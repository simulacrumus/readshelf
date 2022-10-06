import api from "../../utils/api";
import { 
    PUBLIC_PROFILE_LOADING,
    PUBLIC_PROFILE_LOAD_SUCCESS,
    PUBLIC_PROFILE_LOAD_FAILED,
} from "../types";

export const getPublicProfile = (id) => async dispatch => {
    dispatch({
      type: PUBLIC_PROFILE_LOADING
    });
    try {
      const res = await api.get(`/profile/${id}`);
      dispatch({
        type: PUBLIC_PROFILE_LOAD_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PUBLIC_PROFILE_LOAD_FAILED
      });
    }
}