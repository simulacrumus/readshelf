import api from "../../utils/api";
import { 
    PROFILE_FIELDS_UPDATE_LOADING,
    PROFILE_FIELDS_UPDATE_SUCCESS,
    PROFILE_FIELDS_UPDATE_FAILED,
} from "../types";

export const updateProfile = (profileFields) => async dispatch => {
    const body = profileFields
    dispatch({
      type: PROFILE_FIELDS_UPDATE_LOADING
    })
    try {
      const res = await api.post('/profile', body);
      dispatch({
        type: PROFILE_FIELDS_UPDATE_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_FIELDS_UPDATE_FAILED
      });
    }
}