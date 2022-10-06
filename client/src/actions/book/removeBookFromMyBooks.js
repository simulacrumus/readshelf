import api from "../../utils/api";
import { 
    BOOK_REMOVE_FROM_MY_BOOKS_LOADING,
    BOOK_REMOVE_FROM_MY_BOOKS_SUCCESS,
    BOOK_REMOVE_FROM_MY_BOOKS_FAILED,
} from "../types";

export const removeBookFromMyBooks = (googleApiId) => async dispatch => {
    dispatch({
      type: BOOK_REMOVE_FROM_MY_BOOKS_LOADING
    })
    try {
      const res = await api.delete(`/profile/mybooks/${googleApiId}`);
      dispatch({
        type: BOOK_REMOVE_FROM_MY_BOOKS_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_REMOVE_FROM_MY_BOOKS_FAILED
      });
    }
}