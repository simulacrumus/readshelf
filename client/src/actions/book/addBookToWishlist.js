import api from "../../utils/api";
import { 
    BOOK_ADD_TO_WISHLIST_LOADING,
    BOOK_ADD_TO_WISHLIST_SUCCESS,
    BOOK_ADD_TO_WISHLIST_FAILED,
} from "../types";

export const addBookToWishlist = (googleApiId) => async dispatch => {
    const body = {googleApiId}
      dispatch({
      type: BOOK_ADD_TO_WISHLIST_LOADING
    })
    try {
      const res = await api.patch('/profile/wishlist', body);
      dispatch({
        type: BOOK_ADD_TO_WISHLIST_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ADD_TO_WISHLIST_FAILED
      });
    }
}