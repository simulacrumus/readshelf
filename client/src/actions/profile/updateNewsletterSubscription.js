import api from "../../utils/api";
import { 
    PROFILE_NEWSLETTER_UPDATE_LOADING,
    PROFILE_NEWSLETTER_UPDATE_SUCCESS,
    PROFILE_NEWSLETTER_UPDATE_FAILED,
} from "../types";

export const updateNewsletterSubscription = (isSubscribed) => async dispatch => {
    const body = {isSubscribed}
    dispatch({
      type: PROFILE_NEWSLETTER_UPDATE_LOADING
    })
    try {
      await api.patch('/profile/newsletter', body);
      dispatch({
        type: PROFILE_NEWSLETTER_UPDATE_SUCCESS,
        payload: isSubscribed
      });
    } catch (err) {
      dispatch({
        type: PROFILE_NEWSLETTER_UPDATE_FAILED
      });
    }
}