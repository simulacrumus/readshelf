import api from "../../utils/api";
import { 
    BOOK_REMOVE_FROM_WISHLIST_LOADING,
    BOOK_REMOVE_FROM_WISHLIST_SUCCESS,
    BOOK_REMOVE_FROM_WISHLIST_FAILED,
} from "../types";

export const removeBookFromWishlist = (googleApiId) => async dispatch => {
    dispatch({
      type: BOOK_REMOVE_FROM_WISHLIST_LOADING
    })
    try {
      const res = await api.delete(`/profile/wishlist/${googleApiId}`);
      dispatch({
        type: BOOK_REMOVE_FROM_WISHLIST_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_REMOVE_FROM_WISHLIST_FAILED
      });
    }
}