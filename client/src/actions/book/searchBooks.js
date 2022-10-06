import api from "../../utils/api";
import { 
    BOOK_GLOABAL_SEARCH_LOADING,
    BOOK_GLOABAL_SEARCH_SUCCESS,
    BOOK_GLOABAL_SEARCH_FAILED,
} from "../types";

export const searchBooks = (query) => async dispatch => {
    dispatch({
        type: BOOK_GLOABAL_SEARCH_LOADING
    });
    try {
        const res = await api.get(`/book/search?query=${query}`);
        dispatch({
            type: BOOK_GLOABAL_SEARCH_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errorMessage = err.response.data.message;
        if(errorMessage){
            dispatch({
                type: BOOK_GLOABAL_SEARCH_FAILED,
                payload: errorMessage
            });
        }
    }
}
