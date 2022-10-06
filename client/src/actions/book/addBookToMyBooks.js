import api from "../../utils/api";
import { 
    BOOK_ADD_TO_MY_BOOKS_LOADING,
    BOOK_ADD_TO_MY_BOOKS_SUCCESS,
    BOOK_ADD_TO_MY_BOOKS_FAILED,
} from "../types";

export const addBookToMyBooks = (googleApiId) => async dispatch => {
    const body = {googleApiId}
    dispatch({
      type: BOOK_ADD_TO_MY_BOOKS_LOADING
    })
    try {
      const res = await api.patch('/profile/mybooks', body);
      dispatch({
        type: BOOK_ADD_TO_MY_BOOKS_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ADD_TO_MY_BOOKS_FAILED
      });
    }
}