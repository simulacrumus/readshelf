import api from "../../utils/api";
import { 
    PROFILE_AVATAR_DELETE_LOADING,
    PROFILE_AVATAR_DELETE_SUCCESS,
    PROFILE_AVATAR_DELETE_FAILED
} from "../types";

export const deleteAvatar = () => async dispatch => {
    dispatch({
      type: PROFILE_AVATAR_DELETE_LOADING
    })
    try {
      const res = await api.delete('/profile/avatar');
      dispatch({
        type: PROFILE_AVATAR_DELETE_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_AVATAR_DELETE_FAILED
      });
    }
}