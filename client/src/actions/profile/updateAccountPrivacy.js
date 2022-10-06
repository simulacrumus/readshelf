import api from "../../utils/api";
import { 
    PROFILE_PRIVATE_ACCOUNT_UPDATE_LOADING,
    PROFILE_PRIVATE_ACCOUNT_UPDATE_SUCCESS,
    PROFILE_PRIVATE_ACCOUNT_UPDATE_FAILED,
} from "../types";

export const updateAccountPrivacy = (isPrivateAccount) => async dispatch => {
    const body = {isPrivateAccount}
    dispatch({
      type: PROFILE_PRIVATE_ACCOUNT_UPDATE_LOADING
    })
    try {
      await api.patch('/profile/privacy', body);
      dispatch({
        type: PROFILE_PRIVATE_ACCOUNT_UPDATE_SUCCESS,
        payload: isPrivateAccount
      });
    } catch (err) {
      dispatch({
        type: PROFILE_PRIVATE_ACCOUNT_UPDATE_FAILED
      });
    }
}