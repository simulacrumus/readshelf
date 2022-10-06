import api from "../../utils/api";
import { 
    BOOK_GET_BEST_SELLER_BOOKS_LOADING,
    BOOK_GET_BEST_SELLER_BOOKS_SUCCESS,
    BOOK_GET_BEST_SELLER_BOOKS_FAILED,
} from "../types";

export const getBestSellerBooks = () => async dispatch => {
    dispatch({
        type: BOOK_GET_BEST_SELLER_BOOKS_LOADING
    });
    try {
        const res = await api.get(`/book/best-sellers`);
        dispatch({
            type: BOOK_GET_BEST_SELLER_BOOKS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: BOOK_GET_BEST_SELLER_BOOKS_FAILED
        });
    }
}