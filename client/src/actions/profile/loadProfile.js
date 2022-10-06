import api from "../../utils/api";
import { 
    PROFILE_LOADING,
    PROFILE_LOAD_SUCCESS,
    PROFILE_LOAD_FAILED,
} from "../types";

export const loadMyProfile = () => async dispatch => {
    dispatch({
      type: PROFILE_LOADING
    });
    try {
      const res = await api.get('/profile/me');
      dispatch({
        type: PROFILE_LOAD_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_LOAD_FAILED
      });
    }
}