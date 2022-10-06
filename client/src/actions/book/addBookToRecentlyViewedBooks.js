import api from "../../utils/api";
import { 
    BOOK_ADD_TO_RECENTLY_VIEWED_BOOKS_LOADING,
    BOOK_ADD_TO_RECENTLY_VIEWED_BOOKS_SUCCESS,
    BOOK_ADD_TO_RECENTLY_VIEWED_BOOKS_FAILED,
} from "../types";

export const addBookToRecentlyViewedBooks = (googleApiId) => async dispatch => {
    const body = {googleApiId}
    dispatch({
      type: BOOK_ADD_TO_RECENTLY_VIEWED_BOOKS_LOADING
    })
    try {
      const res = await api.patch('/profile/recentlyViewedBooks', body);
      dispatch({
        type: BOOK_ADD_TO_RECENTLY_VIEWED_BOOKS_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ADD_TO_RECENTLY_VIEWED_BOOKS_FAILED
      });
    }
}