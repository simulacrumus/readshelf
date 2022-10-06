import api from "../../utils/api";
import { 
    PROFILE_AVATAR_UPDATE_LOADING,
    PROFILE_AVATAR_UPDATE_SUCCESS,
    PROFILE_AVATAR_UPDATE_FAILED,
} from "../types";

export const updateAvatar = (image) => async dispatch => {
    dispatch({
      type: PROFILE_AVATAR_UPDATE_LOADING
    })
    try {
      const res = await api.patch('/profile/avatar', image);
      dispatch({
        type: PROFILE_AVATAR_UPDATE_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log(err)
      dispatch({
        type: PROFILE_AVATAR_UPDATE_FAILED,
        payload: err.response.data.message
      });
    }
}