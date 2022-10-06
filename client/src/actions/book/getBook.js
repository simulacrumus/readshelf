import api from "../../utils/api";
import { addBookToRecentlyViewedBooks } from "./addBookToRecentlyViewedBooks";
import { 
    BOOK_CURRENT_BOOK_LOADING,
    BOOK_CURRENT_BOOK_LOAD_SUCCESS,
    BOOK_CURRENT_BOOK_LOAD_FAILED,
} from "../types";

export const getBookByGoogleBooksApiId = (id) => async dispatch => {
    dispatch({
        type: BOOK_CURRENT_BOOK_LOADING
    });
    try {
        const res = await api.get(`/book/${id}`);
        dispatch({
            type: BOOK_CURRENT_BOOK_LOAD_SUCCESS,
            payload: res.data
        });
        dispatch(addBookToRecentlyViewedBooks(id))
    } catch (err) {
        console.log(err)
        dispatch({
            type: BOOK_CURRENT_BOOK_LOAD_FAILED
        });
}
}